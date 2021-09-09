<template>
  <div class="game-intro" :class="{hide: isStart}">
    <i :class="icon"></i>
    <h2>{{ title }}</h2>
    <span>{{ intro }}</span>
    <button class="common-btn" @click="start">开始</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isStart: false
    }
  },
  props: {
    title: String,
    intro: String,
    icon: String
  },
  methods: {
    start() {
      this.isStart = true
      this.$emit('start')
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