<template>
  <div class="schulte-grid-result common-wrap">
    <game-wrap icon="el-icon-crop" :text="`${($parent.$parent.useTime / 1000).toFixed(2)}s`" tips="本次测试的用时" cursor="unset">
      <game-btn @saveScore="saveScore" @again="again" />
    </game-wrap>
  </div>
</template>

<script>
import GameBtn from '@/components/GameBtn.vue'
import GameWrap from '@/components/GameWrap.vue'

export default {
  components: {
    GameBtn,
    GameWrap,
  },
  methods: {
    async saveScore() {
      const score = this.$parent.$parent.useTime / 1000
      const res = await this.$store.dispatch('saveScore', score)
      if (res.code === 0) this.again()
    },
    again() {
      this.$parent.$parent.useTime = 0
      this.$parent.$parent.componentName = ''
    },
  },
}
</script>

<style lang="scss">
.schulte-grid-result {
  font-weight: bold;
  h4 {
    font-size: 24px;
  }
  .level {
    font-size: 80px;
    margin-bottom: 30px;
  }
  span {
    font-size: 40px;
    margin-bottom: 30px;
  }
}
</style>
