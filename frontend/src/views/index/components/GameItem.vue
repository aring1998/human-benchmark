<template>
  <div class="game-item" @click="$router.push(path)">
    <i :class="icon"></i>
    <h4>{{ title }}</h4>
    <span>{{ intro }}</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    intro: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: '/index'
    }
  }
}
</script>

<style lang="scss">
.game-item {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 260px;
  color: #333;
  background-color: #fff;
  box-shadow: $shadow;
  border-radius: 10px;
  margin: 20px auto 0 auto;
  cursor: pointer;
  top: 0;
  transition: transform 0.5s;
  &:hover {
    transform: translate(0, -10px);
    i {
      color: $hover-color;
    }
  }
  i {
    font-size: 100px;
    color: $light-main-color;
  }
  h4 {
    font-size: 24px;
  }
  span {
    font-size: 18px;
    text-align: center;
  }
}
@media screen and (max-width: 480px) {
  .game-item {
    width: 100%;
    border-radius: unset;
  }
}
</style>
