<template>
  <div class="game-wrap" :style="{ 'background-color': bgColor, 'cursor': cursor }">
    <i :class="getIconName()"></i>
    <h2>{{ text }}</h2>
    <span v-if="tips.length > 0">{{ tips }}</span>
    <slot></slot>
  </div>
</template>

<script>
import { smallHumpNaming } from '@/utils/index'
import { iconName } from '@/assets/js/iconName'
export default {
  props: {
    bgColor: {
      type: String,
      default: '$main-color'
    },
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
  }
  h2 {
    font-size: 40px;
  }
  span {
    font-size: 25px;
    margin-bottom: 30px;
  }
}
</style>