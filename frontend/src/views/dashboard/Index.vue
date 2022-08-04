<template>
  <div class="dashboard-wrap pages">
    <div class="dashboard">
      <nav-bar></nav-bar>
      <router-view />
      <mail-station></mail-station>
    </div>
  </div>
</template>

<script>
import MailStation from '@/components/MailStation.vue'
import NavBar from './components/NavBar.vue'
export default {
  components: {
    NavBar,
    MailStation
  }
}
</script>

<style lang="scss">
.dashboard-wrap {
  .dashboard {
    padding: 30px;
    max-width: $max-width;
    margin: 0 auto;
    display: flex;
    .card-wrap {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      font-size: 18px;
      position: relative;
      .card {
        border-radius: 5px;
        box-shadow: $shadow;
        background-color: #fff;
        padding: 30px;
        margin-bottom: 20px;
      }
    }
  }
}
@media screen and (max-width: 480px) {
  .dashboard-wrap {
    .dashboard {
      padding: 30px 0;
    }
  }
}
</style>
