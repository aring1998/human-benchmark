<template>
  <div class="reaction-time-game-wrap" :style="{ 'background-color': bgColor, 'cursor': cursor }">
    <i :class="icon"></i>
    <h2>{{ text }}</h2>
    <span v-if="tips.length > 0">{{ tips }}</span>
    <slot></slot>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="scss">
.reaction-time-game-wrap {
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