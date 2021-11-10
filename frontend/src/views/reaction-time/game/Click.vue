<template>
  <div @touchstart="touchstart" @touchend="touchend">
    <game-wrap
      icon="el-icon-more"
      text="点击！"
      bgColor="#67C23A"
    />
  </div>
</template>

<script>
import GameWrap from '@/components/GameWrap.vue'
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
    this.$nextTick(() => {
      this.beginTime = new Date().getTime() // 开始时间
    })
  },
  methods: {
    touchstart() {
      let reactionTime = new Date().getTime()
      reactionTime -= this.beginTime
      this.$parent.$parent.reactionTime = reactionTime
      this.$parent.$parent.reactionTimeArr.push(reactionTime)
      this.$parent.$parent.count++
    },
    touchend() {
      this.$parent.$parent.componentName = 'Result'
    }
  }
}
</script>

<style>

</style>