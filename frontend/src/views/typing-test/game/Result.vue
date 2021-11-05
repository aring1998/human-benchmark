<template>
  <game-wrap
    :text="`${$parent.$parent.wordEveryMin}`"
    tips="本次测试的您每分钟打字字数"
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
      this.$parent.$parent.componentName = 'GameContent'
      this.$parent.$parent.wordEveryMin = 0
    }
  }
}
</script>

<style>

</style>