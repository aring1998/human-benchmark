<template>
  <game-wrap
    :text="`${$parent.$parent.percentile}%`"
    tips="本次测试您达到的百分位"
    cursor="unset"
  >
    <div v-html="$parent.$parent.cardStr" class="card-list"></div>
    <game-btn @saveScore="saveScore" @again="again"/>
  </game-wrap>
</template>

<script>
import GameWrap from '@/components/GameWrap.vue'
import GameBtn from '@/components/GameBtn.vue'
export default {
  components: {
    GameWrap,
    GameBtn
  },
  methods: {
    async saveScore() {
      const score = this.$parent.$parent.percentile
      const res = await this.$store.dispatch('saveScore', score)
      if (res.code === 0) this.again()
    },
    again() {
      this.$parent.$parent.componentName = ''
    }
  }
}
</script>

<style lang="scss">
.game-wrap {
  .card-list {
    margin-bottom: 30px;
    span {
      font-size: 18px;
    }
  }
}
</style>