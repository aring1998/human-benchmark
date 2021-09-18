<template>
  <div class="card-wrap">
    <div class="card path">
      <div class="item">
        <router-link to="/dashboard">{{ $store.state.userInfo.username }}</router-link>
        <span> > </span>
        <span>{{ title }}</span>
      </div>
      <div class="item" v-if="!$store.state.userInfo.username">
        <span>
        <router-link to="/account/login">登录</router-link>
        或
        <router-link to="/account/register">注册</router-link>
        以保存您的测试结果
      </span>
      </div>
    </div>
    <div class="card record-info">
      <h3>{{ title }}</h3>
      <h2>{{ score || '?' }}</h2>
      <span>{{ unit }}</span>
      <h4>百分之 {{ percentile || '0%' }}</h4>
      <router-link :to="`/${$route.path.split('/')[1]}`"><i class="el-icon-video-play" />开始测试</router-link>
    </div>
    <div class="card statistical-data">
      <h2>{{ title }}统计数据</h2>
      <div id="allDataChart" style="height: 300px; width: 100%;"></div>
    </div>
    <div class="card statistical-data">
      <h2>您的{{ title }}统计数据</h2>
      <div id="userDataChart" style="height: 300px; width: 100%;"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: ''
    }
  },
  props: {
    title: String,
    unit: String,
    allDataOptions: Object,
    userDataOptions: Object
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      // 初始化echarts实例
      let allDataChart = this.$echarts.init(document.getElementById('allDataChart'))
      window.onresize = allDataChart.resize
      allDataChart.setOption(this.allDataOptions)

      let userDataChart = this.$echarts.init(document.getElementById('allDataChart'))
      window.onresize = userDataChart.resize
      userDataChart.setOption(this.userDataOptions)
    }
  }
}
</script>

<style lang="scss" scoped>
.path {
  .item:nth-child(1) {
    color: #333;
    font-size: 27px;
    margin-bottom: 10px;
    a {
      text-decoration: none;
    }
  }
  .item:nth-child(2) {
    color: #333;
    font-size: 18x;
  }
}
.record-info {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  h2 {
    font-size: 80px;
    margin: 2px 0;
  }
  h3 {
    font-size: 27px;
    margin: 2px 0;
  }
  h4 {
    margin: 0 0 10px 0;
  }
  span {
    font-size: 24px;
    margin-bottom: 10px;
  }
  a {
    text-decoration: none;
  }
}
.statistical-data {
  h2 {
    margin: 0;
  }
}
</style>