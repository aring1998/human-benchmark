<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view/>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
export default {
  name: 'App',
  components: {
    TopBar
  }
}
</script>

<style lang="scss">
@import './assets/styles/normalize.css';
@import './assets/styles/index.scss';
</style>
