<template>
  <game-wrap :text="`${$parent.$parent.level}`" tips="本次测试您的等级" cursor="unset">
    <game-btn @saveScore="saveScore" @again="again" />
  </game-wrap>
</template>

<script>
import GameWrap from '@/components/GameWrap.vue'
import GameBtn from '@/components/GameBtn.vue'
export default {
  components: {
    GameWrap,
    GameBtn
  },
  methods: {
    async saveScore() {
      const score = this.$parent.$parent.level
      const res = await this.$store.dispatch('saveScore', score)
      if (res.code === 0) this.again()
    },
    again() {
      this.$parent.$parent.level = 1
      this.$parent.$parent.componentName = ''
    }
  }
}
</script>

<style lang="scss">
.game-wrap {
  .card-list {
    margin-bottom: 30px;
    span {
      font-size: 18px;
    }
  }
}
</style>
