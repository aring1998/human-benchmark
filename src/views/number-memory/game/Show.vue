<template>
  <div class="number-memory-show-wrap common-wrap">
    <span>{{ $parent.$parent.numberText }}</span>
    <div class="progress-wrap">
      <div class="progress" :style="{'width': `${percentage}%`}"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 100
    }
  },
  mounted() {
    // 根据等级设置闯关数字
    for (let i = 0; i < this.$parent.$parent.level; i++) {
      const randomNo = Math.floor(Math.random() * 10)
      this.$parent.$parent.numberText += randomNo
    }
    // 进度条开始滚动
    setTimeout(() => {
      this.percentage = 0
    }, 50)
    // 进度条结束滚动
    setTimeout(() => {
      this.$parent.$parent.componentName = 'Input'
    }, 5050)
  }
}
</script>

<style lang="scss">
.number-memory-show-wrap {
  padding: 0 30px;
  span {
    font-size: 80px;
    font-weight: bold;
    margin-bottom: 30px;
    width: 100%;
    display: block;
    word-wrap: break-word;
    white-space: normal;
    user-select: none;
    cursor: unset;
  }
  .progress-wrap {
    width: 20%;
    border-radius: 999px;
    background-color: rgba($color: #000, $alpha: .1);
    .progress {
      height: 10px;
      border-radius: 999px;
      transition: width 5s linear;
      background-color: #fff;
    }
  }
}
@media screen and (max-width: 480px) {
  .number-memory-show-wrap {
    span {
      font-size: 40px;
    }
    .progress-wrap {
      width: 30%;
    }
  }
}
</style>