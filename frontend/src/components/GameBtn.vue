<template>
  <div class="btn-wrap">
    <button class="common-btn" @click="$emit('saveScore')" :disabled="disabled" v-loading="$store.state.loading">保存分数</button>
    <button class="common-btn secondary" @click="$emit('again')" :disabled="disabled">再试一次</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: true
    }
  },
  props: {
    disabledDuration: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.disabled = false
    }, this.disabledDuration)
  }
}
</script>

<style>
.btn-wrap {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
</style>
