<template>
  <div class="number-memory-result-wrap common-wrap" @keydown.enter="continues">
    <h4>数字</h4>
    <span>{{ $parent.$parent.numberText }}</span>
    <h4>您的答案</h4>
    <span :class="{'wrong': $parent.$parent.numberText !== $parent.$parent.userAnswer}">
      {{ $parent.$parent.userAnswer || '为什么不写捏？' }}
    </span>
    <h2>{{ `${$parent.$parent.level}级` }}</h2>
    <button class="common-btn" @click="continues" v-if="$parent.$parent.numberText === $parent.$parent.userAnswer">继续</button>
    <game-btn @saveScore="saveScore" @again="again" v-else></game-btn>
  </div>
</template>

<script>
import GameBtn from '@/components/GameBtn.vue'
export default {
  components: {
    GameBtn
  },
  mounted() {
    // 设定延迟以防止继承切换组件前的Enter操作
    setTimeout(() => {
      document.onkeydown = (e) => {
        if (e.code === 'Enter') {
          if (this.$parent.$parent.numberText === this.$parent.$parent.userAnswer) this.continues()
        }
      }
    }, 100)
  },
  methods: {
    continues() {
      this.resetText()
      this.$parent.$parent.level++
      this.$parent.$parent.componentName = 'Show'
    },
    saveScore() {
      this.again()
    },
    again() {
      this.resetText()
      this.$parent.$parent.level = 1
      this.$parent.$parent.componentName = ''
    },
    resetText() {
      this.$parent.$parent.numberText = ''
      this.$parent.$parent.userAnswer = ''
    }
  }
}
</script>

<style lang="scss">
.number-memory-result-wrap {
  padding: 0 30px;
  h4 {
    font-size: 20px;
    margin: 0;
    color: rgba($color: #fff, $alpha: .6);
    margin-bottom: 5px;
  }
  span {
    font-size: 40px;
    font-weight: bold; 
    &:nth-child(1) {
      margin-bottom: 30px;
    }
    &.wrong {
      text-decoration: line-through;
      color: #666;
    }
  }
  h2 {
    font-size: 60px;
    font-weight: bold;
  }
  input {
    background: rgba(0, 0, 100, 0.2);
    border-radius: 3px;
    text-align: center;
    font-size: 48px;
    font-weight: bold;
    width: 50%;
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
    appearance: none;
    margin-bottom: 30px;
    padding: 10px;
    color: #fff;
    &:focus {
      border: 1px solid rgb(204, 204, 204);
    }
  }
}
</style>