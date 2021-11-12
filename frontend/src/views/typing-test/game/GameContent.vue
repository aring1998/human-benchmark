<template>
  <div class="typing-test-game-wrap common-wrap">
    <h2>{{ $parent.$parent.wordEveryMin || '打字测试' }}</h2>
    <h4>您每分钟能打多少字？</h4>
    <div class="typing-wrap hide-on-mob" v-loading="loading">
      <span
        v-for="(item, index) in text.length"
        :key="index"
        :class="{
          'current': index === userTyping.length,
          // 将文本内容与用户输入进行比对
          'right': text.substring(index, index + 1) === userTyping[index],
          'wrong': text.substring(index, index + 1) !== userTyping[index] && index < userTyping.length
        }"
        >{{ text.substring(index, index + 1) }}</span>
    </div>
    <div class="timer hide-on-mob">
      <p v-if="timer !== null">{{ `${minute} : ${second}` }}</p>
      <p v-else>按下键盘后开始游戏</p>
    </div>
    <only-p-c />
  </div>
</template>

<script>
import OnlyPC from '@/components/OnlyPC.vue'
export default {
  data() {
    return {
      text: '',
      userTyping: [],
      isFirst: true,
      second: '00',
      minute: '00',
      timer: null,
      wordTimer: null,
      flag: true,
      loading: false
    }
  },
  components: {
    OnlyPC
  },
  mounted() {
    this.getArticle()
    document.addEventListener('keydown', this.typing)
    // 在销毁前钩子清除document监听事件以防影响其他组件
    this.$once('hook:beforeDestroy', () => { document.removeEventListener('keydown', this.typing, false) })
  },
  methods: {
    async getArticle() {
      this.loading = true
      const res = await this.$api.get('articles/randomArticle')
      if (res.code === 0) this.text = res.data.text
      this.loading = false
    },
    // 打字
    typing(e) {
      e.preventDefault()
      if (e.key === 'Backspace') return this.userTyping.pop()
      // 判断是否输入指定字符
      if (!/^[a-zA-Z0-9]{1}$/.test(e.key) 
        && !/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g.test(e.key)) return
      this.userTyping.push(e.key)
      if (this.isFirst) this.firstKeyDown()
      if (this.userTyping.length === this.text.length) {
        this.$nextTick(() => {
          this.$parent.$parent.componentName = 'Result'
        })
      }
    },
    // 第一次按下键盘
    firstKeyDown() {
      this.run()
      this.isFirst = false
      // 计算每分钟打字数
      this.wordTimer = setInterval(() => {
        const rightCount = document.getElementsByClassName('right').length
        const currentSecond = +this.second + +this.minute * 60
        this.$parent.$parent.wordEveryMin = Math.round((rightCount / currentSecond) * 60)
      }, 1000)
    },
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
    width: 100%;
    max-width: $max-width;
    word-wrap: break-word;
    font-size: 18px;
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
    min-height: 50px;
    line-height: 1.6;
    cursor: text;
    color: #333;
    user-select: none;
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
