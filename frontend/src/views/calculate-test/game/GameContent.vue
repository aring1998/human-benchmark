<template>
  <div class="calculate-test-wrap common-wrap">
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
      <p v-if="!timer">按Enter键或点击“答题”按钮开始</p>
      <p v-else>{{ question }} = ?</p>
      <input ref="userAnswer" type="number" v-model="answer" @keydown.enter="submit" @paste="(e) => e.preventDefault()" />
    </div>
    <div class="btn-wrap">
      <button class="common-btn" @click="submit">答题</button>
    </div>
  </div>
</template>

<script>
import { getRandomCalcSymbol } from '../config/data'
import { getRandomIntNumber } from '@/utils'

export default {
  data() {
    return {
      time: 60,
      timer: null,
      question: '',
      answer: '',
    }
  },
  mounted() {
    this.$refs.userAnswer.focus()
  },
  methods: {
    renderCalcQuestion(initSymbol) {
      let firstNum = getRandomIntNumber(100, 2000)
      let secondNum = getRandomIntNumber(100, 2000)
      if (firstNum === secondNum) return this.renderCalcQuestion()
      const symbol = initSymbol || getRandomCalcSymbol()
      if (symbol === '-') {
        const isAnswerPositiveInt = firstNum - secondNum > 0
        if (!isAnswerPositiveInt) return this.renderCalcQuestion('-')
      }
      if (symbol === '*') {
        firstNum = getRandomIntNumber(10, 100)
        secondNum = getRandomIntNumber(10, 20)
        if (firstNum === secondNum) return this.renderCalcQuestion()
      }
      if (symbol === '/') {
        firstNum = getRandomIntNumber(100, 1000)
        secondNum = getRandomIntNumber(10, 200)
        const isAnswerInt = firstNum % secondNum === 0
        if (!isAnswerInt) return this.renderCalcQuestion('/')
      }
      this.question = `${firstNum} ${symbol} ${secondNum}`
    },
    firstClick() {
      clearInterval(this.timer)
      this.nextQuestion()
      this.timer = setInterval(() => {
        this.time -= 0.1
        if (this.time <= 0) this.$parent.$parent.componentName = 'Result'
      }, 100)
    },
    submit() {
      if (!this.timer) return this.firstClick()
      if (!this.answer) return this.$refs.userAnswer.focus()
      const correctAnswer = eval(this.question)
      if (correctAnswer !== Number(this.answer)) {
        this.$parent.$parent.score--
      } else {
        this.$parent.$parent.score++
      }
      this.nextQuestion()
    },
    nextQuestion() {
      this.answer = ''
      this.renderCalcQuestion()
      this.$refs.userAnswer.focus()
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>

<style lang="scss">
.calculate-test-wrap {
  .game-table {
    margin: 50px 0;
    p {
      font-size: 40px;
      font-weight: bold;
    }
    input {
      background: rgba(0, 0, 100, 0.2);
      border-radius: 3px;
      text-align: center;
      font-size: 32px;
      width: 300px;
      outline-style: none;
      box-shadow: none;
      border-color: transparent;
      padding: 10px;
      color: #fff;
      border: 1px solid transparent;
      &:focus {
        border: 1px solid rgb(204, 204, 204);
      }
    }
  }
}
</style>
