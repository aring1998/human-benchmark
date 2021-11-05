<template>
  <div class="account pages">
    <router-view />
  </div>
</template>

<script>
import AccountCard from './components/AccountCard.vue'
export default {
  components: {
    AccountCard
  },
  mounted() {
    this.$message.error('功能还未开放哦~请不要浪费时间在此啦~')
  }
}
</script>

<style>
.account {
  padding: 20px 0;
}
</style>