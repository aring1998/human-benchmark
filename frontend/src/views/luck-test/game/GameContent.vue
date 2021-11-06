<template>
  <div class="luck-test-game-wrap common-wrap">
    <div class="info">
      <div class="item">
        <span class="opacity keys">请抽卡</span>
      </div>
    </div>
    <div class="card-wrap">
      <div class="card"
        v-for="(item, index) of cardList"
        :key="index"
        :style="{'color': cardOptions[item].color}"
        :class="{'show': showAnim, 'turn': turnAnim && clickIndex === index}"
        @click="clickCard(item, index)"
      >
        <span :class="{'show-text': clickIndex === index}">{{ cardOptions[item].name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { cardOptions, cardProbability, cardListStr } from '../config/data'
export default {
  data() {
    return {
      cardOptions,
      cardList: [],
      showAnim: false,
      turnAnim: false,
      clickIndex: null,
      clickList: []
    }
  },
  mounted() {
    this.randerCard()
  },
  methods: {
    // 渲染卡片
    randerCard() {
      this.cardList.splice(0)
      this.showAnim = true
      this.turnAnim = false
      this.clickIndex = null
      for (let i = 0; i < 5; i++) {
        const randomNum = (Math.random() * 10) + 1
        const cardIndex = cardProbability(randomNum)
        this.cardList.push(cardIndex)
      }
    },
    clickCard(item, index) {
      if (this.clickIndex) return
      this.showAnim = false
      this.turnAnim = true
      this.clickIndex = index
      this.clickList.push(item)
      if (this.clickList.length === 5) {
        this.$parent.$parent.cardStr = cardListStr(this.clickList)
        // 获取卡牌分值总值
        let score = 0
        this.clickList.forEach(value => {
          score += cardOptions[value].score
        })
        this.$parent.$parent.percentile = (score / 50 * 100).toFixed(1)
        setTimeout(() => {
          this.$parent.$parent.componentName = 'Result'
        }, 2000)
      } 
      setTimeout(() => {
        this.randerCard()
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
.luck-test-game-wrap {
  .info {
    width: unset;
  }
  .card-wrap {
    width: 100%;
    max-width: $max-width;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .card {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 200px;
      margin-right: 20px;
      border-radius: 5px;
      background-color: #fff;
      cursor: pointer;
      &.show {
        animation: textFadeIn 1s linear;
      }
      &.turn {
        animation: turnCard 1s linear forwards;
      }
      span {
        font-size: 25px;
        font-weight: bold;
        user-select: none;
        opacity: 0;
        &.show-text {
          opacity: 1;
          animation: textFadeIn 1s linear;
          transform: rotateY(180deg);
        }
      }
    }
  }
}
@media screen and (max-width: 480px) {
  .luck-test-game-wrap {
    .card-wrap {
      .card {
        width: 60px;
        height: 100px;
        margin-right: 5px;
      }
    }
  }
}
@keyframes turnCard {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}
</style>
