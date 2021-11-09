<template>
  <div @touchstart="touchstart">
    <game-wrap
      icon="el-icon-warning"
      text="太快了"
    />
  </div>
</template>

<script>
import GameWrap from '@/components/GameWrap.vue'
export default {
  components: {
    GameWrap
  },
  methods: {
    touchstart() {
      this.$parent.$parent.componentName = 'Wait'
    }
  }
}
</script>

<style>

</style>