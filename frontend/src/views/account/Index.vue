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
}
</script>

<style>
.account {
  padding: 20px 0;
}
</style>