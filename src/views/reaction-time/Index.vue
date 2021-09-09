<template>
  <div class="reaction-time pages">
    <base-layout>
      <game-intro 
        slot="wrap"
        icon="el-icon-magic-stick"
        title="反应时间"
        intro="当背景变为绿色时，立刻点击"
        @start="startGame"
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
import TooFast from './game/TooFast.vue'
import Wait from './game/Wait.vue'
export default {
  data() {
    return {
      componentName: '',
      reactionTime: 0
    }
  },
  components: {
    BaseLayout,
    GameIntro,
    Again,
    Click,
    TooFast,
    Wait
  },
  methods: {
    startGame() {
      this.componentName = 'Wait'
    }
  }
}
</script>

<style>

</style>