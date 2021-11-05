<template>
  <div id="app" v-cloak>
    <top-bar></top-bar>
    <router-view/>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import FooterBar from '@/components/FooterBar.vue'
export default {
  name: 'App',
  components: {
    TopBar,
    FooterBar
  },
  mounted() {
    if (this.$store.state.userInfo.token) this.$store.dispatch('token')
  }
}
</script>

<style lang="scss">
@import './assets/styles/index.scss';
</style>
