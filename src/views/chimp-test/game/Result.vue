<template>
  <div class="chimp-test-result">
    <h4>等级</h4>
    <span class="level">{{ $parent.$parent.level }}</span>
    <h4>尝试次数</h4>
    <span>{{ `${$parent.$parent.tryCount} / 3` }}</span>
    <button class="common-btn" v-if="$parent.$parent.tryCount < 3" @click="countinue">继续</button>
    <game-btn @saveScore="saveScore" @again="again" v-else/>
  </div>
</template>

<script>
import GameBtn from '@/components/GameBtn.vue'
export default {
  components: {
    GameBtn
  },
  methods: {
    countinue() {
      if (this.$parent.$parent.isSuc === true) {
        if (this.$parent.$parent.level === 39) {
          this.$message.error('您是否作弊了呢？')
          return this.$parent.$parent.tryCount = 3
        }
        this.$parent.$parent.level++
      }
      this.$parent.$parent.componentName = 'GameContent'
    },
    saveScore() {
      this.again()
    },
    again() {
      this.$parent.$parent.level = 4
      this.$parent.$parent.tryCount = 0
      this.$parent.$parent.componentName = ''
    }
  }
}
</script>

<style lang="scss">
.chimp-test-result {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 480px;
  color: #fff;
  background-color: $main-color;
  text-align: center;
  font-weight: 600;
  h4 {
    font-size: 24px;
  }
  .level {
    font-size: 80px;
    margin-bottom: 30px;
  }
  span {
    font-size: 40px;
    margin-bottom: 30px;
  }
}
</style>