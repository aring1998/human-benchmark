<template>
  <game-wrap
    :text="`${Math.round($parent.$parent.time / 29)}ms`"
    tips="每个目标平均用时"
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
      const score = Math.round(this.$parent.$parent.time / 29)
      const res = await this.$store.dispatch('saveScore', score)
      if (res.code === 0) this.again()
    },
    again() {
      this.$parent.$parent.componentName = ''
    }
  }
}
</script>

<style>

</style>