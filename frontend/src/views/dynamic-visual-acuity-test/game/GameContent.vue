<template>
  <div class="dynamic-visual-acuity-test-game-wrap common-wrap">
    <h2>等级：{{ $parent.$parent.level }}</h2>
    <div class="progress-wrap">
      <div class="progress" :style="{ width: `${percentage}%`, transition: isCurrentGameActive ? 'width 30s linear' : '' }"></div>
    </div>
    <div class="main">
      <div class="overlay" v-show="overlayShow">时间已到，请输入答案</div>
      <canvas id="canvas" width="300" height="300"></canvas>
    </div>
    <template v-if="isSuc === 1">
      <p class="result">正确</p>
      <button class="common-btn" @click="next">下一关</button>
    </template>
    <template v-else-if="isSuc === 0">
      <p class="result">错误，正确答案为：{{ ballCount }}</p>
      <button class="common-btn" @click="$parent.$parent.componentName = 'Result'">查看结果</button>
    </template>
    <template v-else>
      <input type="number" placeholder="请输入小球数量" v-model="answer" />
      <button class="common-btn" @click="submit">提交</button>
    </template>
  </div>
</template>

<script>
import { getRandomIntNumber } from '@/utils'
import { getLevelballCount } from '../config/data'

export default {
  data() {
    return {
      percentage: 100,
      answer: '',
      animationId: 0,
      overlayShow: false,
      ballCount: 0,
      isSuc: undefined,
      canvas: null,
      percentageTimer: null,
      isCurrentGameActive: true
    }
  },
  mounted() {
    // 进度条开始滚动
    setTimeout(() => {
      this.percentage = 0
    }, 50)
    this.percentageTimer = setTimeout(() => {
      this.overlayShow = true
    }, 30 * 1000 + 50)

    this.canvas = document.getElementById('canvas')
    this.renderGameCanvas(getLevelballCount(this.$parent.$parent.level))
  },
  methods: {
    renderGameCanvas(ballCountRange) {
      // 标记当前游戏为激活状态
      this.isCurrentGameActive = true

      const ctx = this.canvas.getContext('2d')
      const balls = []
      const radius = 7
      this.ballCount = getRandomIntNumber(...ballCountRange)
      const speed = this.$parent.$parent.level

      for (let i = 0; i < this.ballCount; i++) {
        const angle = Math.random() * Math.PI * 2 // 👈 建议改用角度方式让速度均匀
        balls.push({
          x: Math.random() * (this.canvas.width - 2 * radius) + radius,
          y: Math.random() * (this.canvas.height - 2 * radius) + radius,
          vx: Math.cos(angle) * (1 + speed * 0.5), // 更合理的速度控制
          vy: Math.sin(angle) * (1 + speed * 0.5),
          color: '#ffd154'
        })
      }

      const animate = () => {
        // 关键：如果游戏已切换，不再绘制
        if (!this.isCurrentGameActive) return

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (const ball of balls) {
          ball.x += ball.vx
          ball.y += ball.vy

          if (ball.x - radius < 0 || ball.x + radius > this.canvas.width) ball.vx *= -1
          if (ball.y - radius < 0 || ball.y + radius > this.canvas.height) ball.vy *= -1

          ctx.beginPath()
          ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2)
          ctx.fillStyle = ball.color
          ctx.fill()
        }

        this.animationId = requestAnimationFrame(animate)
      }

      animate()
    },
    submit() {
      if (Number(this.answer) === this.ballCount) {
        this.isSuc = 1
      } else {
        this.isSuc = 0
      }
    },
    next() {
      // 标记上一局失效
      this.isCurrentGameActive = false
      cancelAnimationFrame(this.animationId)

      // 清空画布
      const ctx = this.canvas.getContext('2d')
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // 更新状态
      this.$parent.$parent.level += 1
      this.isSuc = undefined
      this.answer = ''
      this.overlayShow = false
      this.percentage = 100

      this.$nextTick(() => {
        void this.$el.offsetHeight // 触发 reflow（可选，但更保险）
        setTimeout(() => {
          this.percentage = 0
        }, 50)
        clearTimeout(this.percentageTimer)
        this.percentageTimer = setTimeout(() => {
          this.overlayShow = true
        }, 30050) // 30秒 + 50ms

        this.renderGameCanvas(getLevelballCount(this.$parent.$parent.level))
      })
    }
  }
}
</script>

<style lang="scss">
.dynamic-visual-acuity-test-game-wrap {
  h2 {
    font-size: 18px;
    margin: 10px 0;
  }
  .progress-wrap {
    width: 20%;
    border-radius: 999px;
    background-color: rgba($color: #000, $alpha: 0.1);
    .progress {
      height: 10px;
      border-radius: 999px;

      background-color: #fff;
    }
  }
  .main {
    position: relative;
    margin-top: 10px;
    border: 2px solid #000;
    background-color: #000;
    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: gray;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
  }
  input {
    margin: 10px 0;
    background: rgba(0, 0, 100, 0.2);
    border-radius: 3px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    width: 30%;
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
    padding: 10px;
    color: #fff;
    border: 1px solid transparent;
    &:focus {
      border: 1px solid rgb(204, 204, 204);
    }
    &::placeholder {
      color: rgba($color: #fff, $alpha: 0.5);
    }
  }
  .result {
    height: 40px;
    line-height: 40px;
    margin: 10px 0;
  }
  .common-btn {
    height: 30px;
    font-size: 14px;
    min-width: 80px;
  }
}
@media screen and (max-width: 480px) {
  .dynamic-visual-acuity-test-game-wrap {
    .progress-wrap {
      width: 50%;
    }
    input {
      font-size: 16px;
      width: 50%;
    }
  }
}
</style>
