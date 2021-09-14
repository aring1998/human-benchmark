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
  },
  mounted() {
    document.body.onkeydown = function (event) {
      const e = window.event || event;
      if(e.preventDefault) e.preventDefault()
      else window.event.returnValue = false;
    }
  }
}
</script>

<style lang="scss">
@import './assets/styles/normalize.css';
@import './assets/styles/index.scss';
</style>
