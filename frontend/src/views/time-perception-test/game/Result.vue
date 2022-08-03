<template>
  <game-wrap
    :text="`${$parent.$parent.time}ms`"
    tips="本次测试您的时间感知偏差时间"
    cursor="unset"
  >
    <game-btn @saveScore="saveScore" @again="again"/>
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
      const score = Math.round(this.$parent.$parent.time)
      const res = await this.$store.dispatch('saveScore', score)
      if (res.code === 0) this.again()
    },
    again() {
      this.$parent.$parent.componentName = ''
      this.$parent.$parent.time = 0
    }
  }
}
</script>

<style>

</style>