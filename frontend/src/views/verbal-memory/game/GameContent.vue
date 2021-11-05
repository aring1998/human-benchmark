<template>
  <div class="verbal-memory-game-wrap common-wrap">
    <div class="info">
      <div class="item">
        <span class="opacity keys">得分</span>
        <span>{{ $parent.$parent.score }}</span>
      </div>
      <div class="item">
        <span class="opacity keys">生命</span>
        <span>{{ life }}</span>
      </div>
    </div>
    <div class="game-table">
      <span>{{ text }}</span>
    </div>
    <div class="btn-wrap">
      <button class="common-btn" @click="seen">见过</button>
      <button class="common-btn" @click="isNew">新的</button>
    </div>
  </div>
</template>

<script>
import { vocabulary, vocabularyRange } from '../config/data'
export default {
  data() {
    return {
      life: 3,
      text: '',
      randomNum: 0,
      vocabularyList: []
    }
  },
  mounted() {
    this.chioceVocabulary()
  },
  methods: {
    chioceVocabulary() {
      // 根据得分选取随机范围
      const range = vocabularyRange(this.$parent.$parent.score)
      const randomNum = Math.floor(Math.random() * range)
      // 避免连续出现相同词汇
      if (this.randomNum === randomNum) return this.chioceVocabulary()
      else this.randomNum = randomNum
      this.text = vocabulary[randomNum]
    },
    seen() {
      if (this.vocabularyList.indexOf(this.text) > -1) this.$parent.$parent.score++
      else this.life--
      this.onClick()
    },
    isNew() {
      if (this.vocabularyList.indexOf(this.text) === -1) this.$parent.$parent.score++
      else this.life--
      this.onClick()
    },
    onClick() {
      if (this.life === 0) return this.$parent.$parent.componentName = 'Result'
      setTimeout(() => {
        this.vocabularyList.push(this.text)
        this.chioceVocabulary()
      })
    }
  }
}
</script>

<style lang="scss">
.verbal-memory-game-wrap {
  .game-table {
    margin-bottom: 20px;
    span {
      font-size: 54px;
      font-weight: bold;
    }
  }
}
</style>
