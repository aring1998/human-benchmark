<template>
  <div class="account-card">
    <h2>{{ title }}</h2>
    <span>{{ tips }}</span>
    <router-link :to="path" v-if="path !== ''">{{ linkName }}</router-link>
    <slot></slot>
    <div class="forget" v-if="$route.path === '/account/login'">
      <span>忘记密码？</span>
      <router-link to="/account/forget">找回密码</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    tips: String,
    path: {
      type: String,
      default: ''
    },
    linkName: String,
  }
}
</script>

<style lang="scss">
.account-card {
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 5px;
  border-radius: 5px;
  padding: 30px;
  margin: 0 auto;
  max-width: $max-width;
  color: #333;
  text-align: center;
  font-size: 18px;
  h2 {
    font-size: 48px;
    margin: 10px 0;
  }
  a {
    color: $light-main-color;
    &:hover {
      color: $main-color;
    }
  }
}
@media screen and (max-width: 480px) {
  .account-card {
    padding: 30px 15px;
    margin: 0 15px;
  }
}
</style>