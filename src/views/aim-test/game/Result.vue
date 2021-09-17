<template>
  <div>
    <game-wrap
      :icon="iconName.aimTest"
      :text="`${Math.floor($parent.$parent.time / 30)}ms`"
      tips="每个目标平均用时"
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
    }
  }
}
</script>

<style>

</style>