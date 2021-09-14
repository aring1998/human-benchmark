<template>
  <div class="typing-test-game-wrap common-wrap">
    <h2>{{ $parent.$parent.wordEveryMin || '打字测试' }}</h2>
    <h4>您每分钟能打多少字？</h4>
    <div class="typing-wrap">
      <span
        v-for="(item, index) in text.length"
        :key="index"
        :class="{
          'current': index === userTyping.length,
          // 将单字转码并对比
          'right': text.substring(index, index + 1) === userTyping[index],
          'wrong': text.substring(index, index + 1) !== userTyping[index] && index < userTyping.length
        }"
        >{{ text.substring(index, index + 1) }}</span>
    </div>
    <div class="timer">
      <p v-if="timer !== null">{{ `${minute} : ${second}` }}</p>
      <p v-else>按下键盘后开始游戏</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: `If you've never met a moose, it's hard to picture the sheer size of these animals.They're taller than ahorse, even without their giant antlers. They can weigh over 1000 lbs, and can run as fast as 35 miles per
        hour.Fortunately, they're not interested in humans!. Leave them alone and they'll leave you alone,munching on weeds, branches,and any plant they can find in ponds and rivers. They're excellent
        swimmers,and can even eat underwater without any difficulty.`,
      userTyping: [],
      isFirst: true,
      second: '00',
      minute: '00',
      timer: null,
      wordTimer: null
    }
  },
  mounted() {
    let flag = true // 防长按标识符
    document.onkeydown = e => {
      if (!flag) return
      flag = false
      if (e.key === 'Backspace') this.userTyping.pop()
      // 判断是否输入指定字符
      if (!/^[a-zA-Z0-9]{1}$/.test(e.key) 
        && !/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g.test(e.key)) return
      this.userTyping.push(e.key)
      if (this.isFirst) {
        this.run()
        this.isFirst = false
        this.wordTimer = setInterval(() => {
          const rightCount = document.getElementsByClassName('right').length
          const currentSecond = +this.second + +this.minute * 60
          this.$parent.$parent.wordEveryMin = Math.round((rightCount / currentSecond) * 60)
        }, 1000)
      }
      if (this.userTyping.length === this.text.length) {
        this.$nextTick(() => {
          this.$parent.$parent.componentName = 'Result'
        })
      }
    }
    // 屏蔽长按键盘持续输入的默认事件
    document.onkeyup = () => {
      flag = true
    }
  },
  methods: {
    // 开始计时
    run() {
      this.timer = setInterval(() => {
        this.second = this.zero(+this.second + 1)
        if (this.second > 60) {
          this.second = 0
          this.minute = this.zero(+this.minute + 1)
        }
      }, 1000)
    },
    // 补零
    zero(val) {
      if (val < 10) return `0${val}`
      else return val
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.wordTimer)
  }
}
</script>

<style lang="scss">
.typing-test-game-wrap {
  h2 {
    font-size: 80px;
    margin: 0;
  }
  h4 {
    font-size: 24px;
    margin: 0 0 30px 0;
  }
  .typing-wrap {
    width: 60%;
    word-wrap: break-word;
    font-size: 18px;
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
    line-height: 1.6;
    cursor: text;
    color: #333;
    span {
      &.current {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: -2px;
          top: 2px;
          height: 20px;
          width: 2px;
          background-color: #000;
          animation: cursor 1s linear infinite;
        }
      }
      &.right {
        background-color: #67c23a;
      }
      &.wrong {
        background-color: #f56c6c;
      }
    }
  }
}

@keyframes cursor {
  0% {
    background-color: unset;
  }
  50% {
    background-color: #000;
  }
  100% {
    background-color: unset;
  }
}
</style>
