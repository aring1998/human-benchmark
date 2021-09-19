<template>
  <game-wrap
    :text="`${$parent.$parent.score}`"
    tips="本次测试您的得分"
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
    saveScore() {
      this.again()
    },
    again() {
      this.$parent.$parent.componentName = ''
      this.$parent.$parent.score = 0
    }
  }
}
</script>

<style>

</style>