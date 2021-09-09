<template>
  <div @click="click">
    <game-wrap
      icon="el-icon-more"
      text="点击！"
      bgColor="#67C23A"
    />
  </div>
</template>

<script>
import GameWrap from '../components/GameWrap.vue'
export default {
  data() {
    return {
      waitTime: 0,
      beginTime: 0
    }
  },
  components: {
    GameWrap
  },
  mounted() {
    this.beginTime = new Date().getTime() // 开始时间
  },
  methods: {
    click() {
      let reactionTime = new Date().getTime()
      reactionTime -= this.beginTime + 30
      console.log(reactionTime);
      this.$parent.$parent.reactionTime = reactionTime
      this.$parent.$parent.componentName = 'Wait'
    }
  }
}
</script>

<style>

</style>