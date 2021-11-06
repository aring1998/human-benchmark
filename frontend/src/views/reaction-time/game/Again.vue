<template>
  <game-wrap
    icon="el-icon-magic-stick"
    :text="`${result}ms`"
    tips="本次测试的平均反应时间"
    cursor="unset"
  >
    <game-btn @saveScore="saveScore" @again="again"/>
  </game-wrap>
</template>

<script>
import GameWrap from '@/components/GameWrap.vue'
import GameBtn from '@/components/GameBtn.vue'
export default {
  data() {
    return {
      result: 0
    }
  },
  components: {
    GameWrap,
    GameBtn
  },
  mounted() {
    let res = 0
    const reactionTimeArr = this.$parent.$parent.reactionTimeArr
    for (let i of reactionTimeArr) {
      res += i
    }
    this.result = res / reactionTimeArr.length
  },
  methods: {
    async saveScore() {
      const score = this.result
      const res = await this.$store.dispatch('saveScore', score)
      if (res.code === 0) this.again()
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