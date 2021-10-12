<template>
  <div class="game-wrap" :style="{ 'background-color': bgColor, 'cursor': cursor }">
    <i :class="icon ? icon : getIconName()"></i>
    <h2>{{ text }}</h2>
    <span v-if="tips.length > 0">{{ tips }}</span>
    <slot></slot>
  </div>
</template>

<script>
import { smallHumpNaming } from '@/utils/index'
import { iconName } from '@/assets/js/icon-name'
export default {
  props: {
    bgColor: {
      type: String,
      default: '$main-color'
    },
    icon: String,
    text: String,
    tips: {
      type: String,
      default: ''
    },
    cursor: {
      type: String,
      default: 'pointer'
    }
  },
  methods: {
    // 通过路由获取icon名称
    getIconName() {
      return iconName[smallHumpNaming(this.$route.path.replace('/', ''))]
    }
  }
}
</script>

<style lang="scss">
.game-wrap {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 480px;
  color: #fff;
  background-color: $main-color;
  text-align: center;
  padding: 0 20px;
  i {
    font-size: 120px;
    animation: textFadeIn .5s linear;
  }
  h2 {
    font-size: 40px;
    animation: textFadeIn .5s linear;
  }
  span {
    font-size: 25px;
    margin-bottom: 30px;
    animation: textFadeIn .5s linear;
  }
}
</style>