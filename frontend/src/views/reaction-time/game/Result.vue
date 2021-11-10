<template>
  <div @click="click">
    <game-wrap
      icon="el-icon-time"
      :text="text"
      tips="点击任意处继续"
    />
  </div>
</template>

<script>
import GameWrap from '@/components/GameWrap.vue'
export default {
  data() {
    return {
      text: ''
    }
  },
  components: {
    GameWrap
  },
  mounted() {
    this.text = `${this.$parent.$parent.reactionTime}ms`
  },
  methods: {
    click() {
      if (this.$parent.$parent.count === 5) this.$parent.$parent.componentName = 'Again'
      else this.$parent.$parent.componentName = 'Wait'
    }
  }
}
</script>

<style>

</style>