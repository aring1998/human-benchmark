<template>
  <div class="pages">
    <base-layout :chartOptions="chartOptions" :aboutText="aboutText">
      <game-intro 
        slot="wrap"
        title="黑猩猩测试"
        intro="根据方块的编号，依次单击方块，测试会越来越难"
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
      level: 4,
      isSuc: true,
      tryCount: 0
    }
  },
  components: {
    BaseLayout,
    GameIntro,
    GameContent,
    Result
  }
}
</script>

<style>

</style>