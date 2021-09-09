<template>
  <div class="game-item">
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
    intro: String
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
  box-shadow: rgba(0, 0, 0, .1) 0px 2px 5px;
  border-radius: 10px;
  margin: 20px auto 0 auto;
  cursor: pointer;
  top: 0;
  &:hover {
    position: relative;
    top: -10px;
    i {
      color: $sub-color;
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
  }
}
@media screen and (max-width: 480px) {
  .game-item {
    width: 100%;
    border-radius: unset;
  }
}
</style>