<template>
  <div class="number-memory-input-wrap common-wrap">
    <h4>请输入</h4>
    <span>可按Enter提交</span>
    <input type="number" v-model="$parent.$parent.userAnswer" ref="userAnswer" @keydown.enter="submit">
    <button class="common-btn" @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.userAnswer.focus()
  },
  methods: {
    submit() {
      this.$parent.$parent.componentName = 'Result'
    }
  }
}
</script>

<style lang="scss">
.number-memory-input-wrap {
  h4 {
    font-size: 24px;
    margin: 0;
    margin-bottom: 5px;
  }
  span {
    font-size: 18px;
    color: rgba($color: #fff, $alpha: .6);
    margin-bottom: 30px;
  }
  input {
    background: rgba(0, 0, 100, 0.2);
    border-radius: 3px;
    text-align: center;
    font-size: 48px;
    font-weight: bold;
    width: 50%;
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
    appearance: none;
    margin-bottom: 30px;
    padding: 10px;
    color: #fff;
    &:focus {
      border: 1px solid rgb(204, 204, 204);
    }
  }
}
@media screen and (max-width: 480px) {
  .number-memory-input-wrap {
    padding: 0 30px;
    input {
      font-size: 24px;
      width: 100%;
    }
  }
}
</style>