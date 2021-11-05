<template>
  <div class="reaction-time pages">
    <base-layout :chartOptions="chartOptions" :aboutText="aboutText">
      <game-intro 
        slot="wrap"
        title="反应时间"
        intro="当背景变为绿色时，立刻点击"
        v-show="componentName === ''"
        @start="componentName = 'Wait'"
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
import Again from './game/Again.vue'
import Click from './game/Click.vue'
import Result from './game/Result.vue'
import TooFast from './game/TooFast.vue'
import Wait from './game/Wait.vue'
import { chartOptions, aboutText } from './config/data'
export default {
  data() {
    return {
      aboutText,
      chartOptions,
      componentName: '',
      reactionTime: 0,
      count: 0,
      reactionTimeArr: []
    }
  },
  components: {
    BaseLayout,
    GameIntro,
    Again,
    Click,
    Result,
    TooFast,
    Wait
  }
}
</script>

<style lang="scss">
.reaction-time {
  .game-wrap {
    i,
    span,
    h2 {
      animation: unset;
    }
  }
}
</style>