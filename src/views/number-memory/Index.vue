<template>
  <div class="chimp-test pages">
    <base-layout :chartOptions="chartOptions" :aboutText="aboutText">
      <game-intro 
        slot="wrap"
        title="数字记忆"
        intro="一般人一次可以记住7位数字，您可以做到更多吗？"
        v-show="componentName === ''"
        @start="componentName = 'Show'"
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
import Show from './game/Show.vue'
import Input from './game/Input.vue'
import Result from './game/Result.vue'
import { chartOptions, aboutText } from './config/data'
export default {
  data() {
    return {
      aboutText,
      chartOptions,
      componentName: '',
      level: 3,
      numberText: '',
      userAnswer: ''
    }
  },
  components: {
    BaseLayout,
    GameIntro,
    Show,
    Input,
    Result
  }
}
</script>

<style>

</style>