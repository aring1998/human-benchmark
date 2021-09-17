<template>
  <div class="chimp-test pages">
    <base-layout :chartOptions="chartOptions" :aboutText="aboutText">
      <game-intro 
        slot="wrap"
        :icon="iconName.visualMemory"
        title="视觉记忆"
        intro="记住您看见的白色方块"
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
import { iconName } from '@/assets/js/iconName'
import { chartOptions, aboutText } from './config/data'
export default {
  data() {
    return {
      aboutText,
      chartOptions,
      iconName,
      componentName: '',
      level: 1
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