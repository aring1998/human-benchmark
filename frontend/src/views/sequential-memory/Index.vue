<template>
  <div class="pages">
    <base-layout :aboutText="aboutText">
      <game-intro 
        slot="wrap"
        title="序列记忆"
        intro="记住方块闪烁的顺序"
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