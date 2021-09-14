<template>
  <div>
    <game-wrap
      :icon="iconName.typingTest"
      :text="`${$parent.$parent.wordEveryMin}`"
      tips="本次测试的您每分钟打字字数"
      cursor="unset"
    >
      <game-btn @saveScore="saveScore" @again="again"/>
    </game-wrap>
  </div>
</template>

<script>
import GameWrap from '@/views/reaction-time/components/GameWrap.vue'
import GameBtn from '@/components/GameBtn.vue'
import { iconName } from '@/assets/js/iconName'
export default {
  data() {
    return {
      iconName,
      text: ''
    }
  },
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