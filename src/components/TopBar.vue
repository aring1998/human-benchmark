<template>
  <div class="top-bar-wrap">
    <div class="top-bar">
      <div class="top-bar-item">
        <span :class="{'active': $route.path==='/index'}" @click="$router.push('/index')">人类基准测试</span>
        <span>仪表盘</span>
      </div>
      <div class="top-bar-item">
        <span>注册</span>
        <span>登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .top-bar-wrap {
    width: 100%;
    box-shadow: rgba(0,0,0,.2) 0px 0px 10px 0px;
    position: sticky;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 100;
    .top-bar {
      max-width: 1010px;
      height: 48px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      .top-bar-item {
        display: flex;
        height: 48px;
        align-items: center;
        span {
          display: block;
          line-height: 48px;
          padding: 0 10px;
          cursor: pointer;
        }
        span.active {
          background-color: #e8eaed;
          pointer-events: none;
        }
        span:hover {
          background-color: #e8eaed;
        }
      }
    }
  }
</style>