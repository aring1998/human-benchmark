<template>
  <div class="pages">
    <base-layout :aboutText="aboutText">
      <game-intro 
        slot="wrap"
        title="舒尔特方格"
        intro="根据数字顺序快速点击方格"
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
import { aboutText } from './config/data'
export default {
  data() {
    return {
      aboutText,
      componentName: '',
      useTime: 0
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