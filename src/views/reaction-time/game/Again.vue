<template>
  <div>
    <game-wrap
      icon="el-icon-magic-stick"
      :text="text"
      tips="本次测试的平均反应时间"
      cursor="unset"
    >
      <div class="btn-wrap">
        <button class="common-btn" @click="saveScore">保存分数</button>
        <button class="common-btn secondary" @click="again">再试一次</button>
      </div>
    </game-wrap>
  </div>
</template>

<script>
import GameWrap from '../components/GameWrap.vue'
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
    let res = 0
    const reactionTimeArr = this.$parent.$parent.reactionTimeArr
    for (let i of reactionTimeArr) {
      res += i
    }
    this.text = `${res / reactionTimeArr.length}ms`
  },
  methods: {
    saveScore() {
      this.again()
    },
    again() {
      this.$parent.$parent.componentName = ''
      this.$parent.$parent.count = 0
      this.$parent.$parent.reactionTimeArr.splice(0)
    }
  }
}
</script>

<style>

</style>