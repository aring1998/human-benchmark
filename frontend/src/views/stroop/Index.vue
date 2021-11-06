<template>
  <div class="pages">
    <base-layout :chartOptions="chartOptions" :aboutText="aboutText" ref="baseLayout">
      <game-intro 
        slot="wrap"
        title="斯特鲁普"
        intro="正确回答颜色"
        v-show="componentName === ''"
        @start="componentName = 'GameContent'"
      />
      <component
        slot="wrap"
        :is="componentName"
      ></component>
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from '@/components/BaseLayout.vue'
import GameIntro from '@/components/GameIntro.vue'
import GameContent from './game/GameContent.vue'
import Result from './game/Result.vue'
import { chartOptions, aboutText } from './config/data'
export default {
  data() {
    return {
      aboutText,
      chartOptions,
      componentName: '',
      score: 0
    }
  },
  components: {
    BaseLayout,
    GameIntro,
    GameContent,
    Result
  },
  mounted() {
    this.$refs.baseLayout.getChart(this.chartOptions)
  }
}
</script>

<style>

</style>