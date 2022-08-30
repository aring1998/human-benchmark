<template>
  <div class="hand-eye-coordination-test-game-wrap common-wrap">
    <div class="info">
      <span>{{ level }} 级</span>
      <span>{{ $parent.$parent.score }} 分</span>
    </div>
    <div class="wrap" @touchstart="stopBall" @touchend.prevent @mousedown="stopBall">
      <div class="x-axis axis" ref="xAxis">
        <div class="x-ball ball" :style="{ left: `${xBall}px`, transition: `left ${runTime}s linear` }" ref="xBall"></div>
      </div>
      <div class="y-axis axis" ref="yAxis">
        <div class="y-ball ball" :style="{ top: `${yBall}px`, transition: `top ${runTime}s linear` }" ref="yBall"></div>
      </div>
      <div
        class="target"
        :style="{
          width: `${targetDiameter}px`,
          height: `${targetDiameter}px`,
          left: `calc(50% - ${targetDiameter / 2}px)`,
          top: `calc(50% - ${targetDiameter / 2}px)`,
          borderColor: score === 0 ? '#fff' : score === 1 ? '#E6A23C' : score === 2 ? '#67C23A' : '#F56C6C'
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { getLevelValue } from '../config/data'
export default {
  data() {
    return {
      level: 1,
      score: 0,
      xBall: -25,
      yBall: -25,
      xRunTimer: null,
      yRunTimer: null,
      runTime: 3,
      targetDiameter: 150,
      xBallEnd: 0,
      yBallEnd: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.xBallRun()
    }, 500)
  },
  methods: {
    xBallRun() {
      const axis = this.$refs.xAxis.clientWidth - 25
      this.xBall = axis
      this.xRunTimer = setInterval(() => {
        if (this.xBall === -25) this.xBall = axis
        else this.xBall = -25
      }, this.runTime * 1000)
    },
    yBallRun() {
      const axis = this.$refs.xAxis.clientWidth - 25
      this.yBall = axis
      this.yRunTimer = setInterval(() => {
        if (this.yBall === -25) this.yBall = axis
        else this.yBall = -25
      }, this.runTime * 1000)
    },
    stopBall() {
      if (this.xRunTimer !== null) {
        this.xBall = this.$refs.xBall.offsetLeft
        clearInterval(this.xRunTimer)
        this.xRunTimer = null
        this.yBallRun()
      } else if (this.yRunTimer !== null) {
        this.yBall = this.$refs.yBall.offsetTop
        clearInterval(this.yRunTimer)
        this.gameEnd()
      }
    },
    gameEnd() {
      if (this.score) return
      const start = this.$refs.xAxis.clientWidth / 2 - this.targetDiameter / 2
      const end = start + this.targetDiameter - 50
      if (this.xBall > start && this.xBall < end) {
        this.score++
      }
      if (this.yBall > start && this.yBall < end) {
        this.score++
      }
      if (!this.score) {
        this.score = 3
        setTimeout(() => {
          this.$parent.$parent.componentName = 'Result'
        }, 1000)
      } else {
        this.$parent.$parent.score += this.score
        setTimeout(() => {
          this.runTime = 0
          this.xBall = -25
          this.yBall = -25
          this.score = 0
          this.level++
          const { targetDiameter, runTime } = getLevelValue(this.level)
          this.targetDiameter = targetDiameter
          setTimeout(() => {
            this.runTime = runTime
            this.$nextTick(() => {
              this.xBallRun()
            })
          }, 500)
        }, 1500)
      }
    }
  }
}
</script>

<style lang="scss">
.hand-eye-coordination-test-game-wrap {
  text-align: center;
  .wrap {
    position: relative;
    width: 350px;
    height: 350px;
    .axis {
      background-color: #000;
      position: absolute;
    }
    .ball {
      position: absolute;
      border-radius: 50%;
      height: 50px;
      width: 50px;
      background-color: #fff;
      z-index: 100;
    }
    .target {
      box-sizing: border-box;
      position: absolute;
      border: 2px #fff dashed;
      border-radius: 50%;
    }
    .x-axis {
      width: 300px;
      height: 30px;
      top: calc(50% - 15px);
      left: 25px;
      .x-ball {
        top: -10px;
      }
    }
    .y-axis {
      width: 30px;
      height: 300px;
      left: calc(50% - 15px);
      top: 25px;
      .y-ball {
        left: -10px;
      }
    }
  }
}

@media screen and (max-width: 350px) {
  .hand-eye-coordination-test-game-wrap {
    .wrap {
      width: 300px;
      height: 300px;

      .x-axis {
        width: 250px;
        height: 30px;
      }
      .y-axis {
        width: 30px;
        height: 250px;
      }
    }
  }
}
</style>
