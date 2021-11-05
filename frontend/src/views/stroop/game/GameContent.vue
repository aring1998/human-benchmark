<template>
  <div class="stroop-game-wrap common-wrap">
    <div class="info">
      <div class="item">
        <span class="opacity keys">得分</span>
        <span>{{ $parent.$parent.score }}</span>
      </div>
      <div class="item">
        <span>{{ time.toFixed(1) }}s</span>
      </div>
    </div>
    <div class="game-table">
      <span :style="{ color }">{{ showText }}</span>
    </div>
    <div class="btn-wrap">
      <button class="common-btn" @click="clickYes" @click.once="firstClick">是</button>
      <button class="common-btn secondary" @click="clickNo" @click.once="firstClick">否</button>
    </div>
  </div>
</template>

<script>
import { colorArr } from '../config/data'
export default {
  data() {
    return {
      time: 30,
      timer: null,
      randomTextIndex: 0,
      randomColorIndex: 0,
      showText: '',
      color: ''
    }
  },
  mounted() {
    this.randerText()
  },
  methods: {
    randerText() {
      this.randomTextIndex = Math.floor(Math.random() * 4)
      this.randomColorIndex = Math.floor(Math.random() * 4)
      this.showText = colorArr[this.randomTextIndex].name
      this.color = colorArr[this.randomColorIndex].color
    },
    firstClick() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.time -= 0.1
        if (this.time < 0) this.$parent.$parent.componentName = 'Result'
      }, 100)
    },
    clickYes() {
      if (this.randomTextIndex === this.randomColorIndex) this.rightClick()
      else this.wrongClick()
    },
    clickNo() {
      if (this.randomTextIndex !== this.randomColorIndex) this.rightClick()
      else this.wrongClick()
    },
    rightClick() {
      this.$parent.$parent.score++
      this.randerText()
    },
    wrongClick() {
      this.$parent.$parent.componentName = 'Result'
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss">
.stroop-game-wrap {
  .game-table {
    margin: 50px 0;
    span {
      font-size: 100px;
      font-weight: 900;
    }
  }
}

</style>
