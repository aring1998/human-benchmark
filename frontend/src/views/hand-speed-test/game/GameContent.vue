<template>
  <div class="hand-speed-test-game-wrap common-wrap">
    <div class="info">
      <!-- <div class="item">
        <span class="opacity keys">计时会在您第一次点击后开始</span>
      </div> -->
      <div class="item">
        <span class="opacity keys">{{ time !== 10 ? `${time.toFixed(1)}s` : '计时会在您第一次点击后开始' }}</span>
      </div>
    </div>
    <div class="click-wrapper">
      <i
        class="el-icon-thumb"
        :style="{
          top: hand.top,
          right: hand.right,
          bottom: hand.bottom,
          left: hand.left
        }"
        @click.once="firstClick"
        @click="click"
      />
    </div>
    <span class="score">{{ $parent.$parent.clickCounter }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      time: 10,
      hand: {
        top: '',
        right: '',
        bottom: '',
        left: ''
      },
    }
  },
  methods: {
    firstClick() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.time -= 0.1
        if (this.time < 0) this.$parent.$parent.componentName = 'Result'
      }, 100)
    },
    click() {
      for (let key in this.hand) {
        this.hand[key] = Math.random() < 0.5 ? `${Math.random() * 5 + 5}px` : `-${Math.random() * 5 + 5}px`
      }
      this.$parent.$parent.clickCounter++
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss">
.hand-speed-test-game-wrap {
  .info {
    width: unset;
  }
  .click-wrapper {
    margin-top: 20px;
    i {
      font-size: 150px;
      font-weight: 900;
      cursor: pointer;
      position: relative;
    }
  }
  .score {
    margin-top: 20px;
    font-size: 50px;
  }
}
</style>
