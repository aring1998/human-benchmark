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
    }, 10)
    // 进度条结束滚动
    setTimeout(() => {
      this.$parent.$parent.componentName = 'Input'
    }, 5000);
  }
}
</script>

<style lang="scss">
.number-memory-show-wrap {
  span {
    font-size: 90px;
    font-weight: 600;
    margin-bottom: 30px;
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

</style>