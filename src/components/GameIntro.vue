<template>
  <div class="game-intro">
    <i :class="getIconName()"></i>
    <h2>{{ title }}</h2>
    <span>{{ intro }}</span>
    <button class="common-btn" @click="$emit('start')">开始</button>
  </div>
</template>

<script>
import { smallHumpNaming } from '@/utils/index'
import { iconName } from '@/assets/js/icon-name'
export default {
  props: {
    title: String,
    intro: String
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
.game-intro {
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
    animation: shine 3s infinite linear, textFadeIn .5s linear;
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
@keyframes shine {
  0% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
}
</style>