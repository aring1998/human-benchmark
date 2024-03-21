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
      <p v-if="!timer">按Enter键或点击"答题"按钮开始</p>
      <p v-else>{{ question }} = ?</p>
      <input ref="userAnswer" type="number" v-model="answer" @keydown.enter="submit" @paste="(e) => e.preventDefault()" />
    </div>
    <div class="btn-wrap">
      <button class="common-btn" @click="submit">答题</button>
    </div>
  </div>
</template>

<script>
import { getRandomCalc, getLevel } from '../config/data'
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
      const calc = getRandomCalc()
      const symbol = initSymbol || calc.symbol

      const level = getLevel(this.$parent.$parent.score)
      const range = calc[`range${level}`]
      const firstNum = getRandomIntNumber(...range.firstNum)
      const secondNum = getRandomIntNumber(...range.secondNum)
      if (firstNum === secondNum) return this.renderCalcQuestion()

      // 减法时，答案不为负数
      if (symbol === '-' && firstNum - secondNum < 0) return this.renderCalcQuestion('-')
      // 除法时，答案需为整数
      else if (symbol === '/' && firstNum % secondNum !== 0) return this.renderCalcQuestion('/')

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
      user-select: none;
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
