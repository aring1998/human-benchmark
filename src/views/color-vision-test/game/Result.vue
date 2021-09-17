<template>
  <div>
    <game-wrap
      :icon="iconName.colorVisionTest"
      :text="`Level ${$parent.$parent.level}`"
      tips="本次测试您达到的等级"
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
      iconName
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
      this.$parent.$parent.componentName = ''
      this.$parent.$parent.level = 1
    }
  }
}
</script>

<style>

</style>