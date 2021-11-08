<template>
  <div @click="click">
    <game-wrap
      icon="el-icon-more"
      text="请等待"
      bgColor="#F56C6C"
    />
  </div>
</template>

<script>
import GameWrap from '@/components/GameWrap.vue'
export default {
  data() {
    return {
      waitTime: 0,
      waitGreen: null // 定时器
    }
  },
  components: {
    GameWrap
  },
  mounted() {
    this.waitTime = (Math.random() * 5 + 2) * 1000  // 等待时间
    this.waitGreen = setTimeout(() => {
      this.$parent.$parent.componentName = 'Click'
    }, this.waitTime)
  },
  methods: {
    click() {
      this.$parent.$parent.componentName = 'TooFast'
      clearTimeout(this.waitGreen)
    }
  }
}
</script>

<style>

</style>