<template>
  <div class="btn-wrap">
    <button class="common-btn" @click="$emit('saveScore')">保存分数</button>
    <button class="common-btn secondary" @click="$emit('again')">再试一次</button>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.btn-wrap {
  width: 250px;
  display: flex;
  justify-content: space-around;
}
</style>