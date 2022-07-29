<template>
  <div class="card-wrap">
    <div class="card path">
      <div class="item">
        <router-link to="/dashboard">{{ $store.state.userInfo.username || '访客' }}</router-link>
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
    <div class="card record-info" v-loading="loading">
      <h3>{{ title }}</h3>
      <h2>{{ score || '?' }}</h2>
      <span>{{ unit }}</span>
      <h4>排名 {{ percentile || 0 }}%</h4>
      <router-link :to="startRouter"><i class="el-icon-video-play" />开始测试</router-link>
    </div>
    <div class="card statistical-data" v-loading="loading">
      <h2>{{ title }}统计数据</h2>
      <div id="allDataChart" style="height: 300px; width: 100%;"></div>
    </div>
    <div class="card statistical-data" v-loading="loading">
      <h2>您的{{ title }}统计数据</h2>
      <div id="userDataChart" style="height: 300px; width: 100%;"></div>
    </div>
  </div>
</template>

<script>
import { init as echartsInit } from 'echarts'
import { gameList } from '@/views/index/config/data'
import { autoCreateChartOptions } from '@/utils/game-config'
export default {
  data() {
    return {
      score: '',
      percentile: '',
      loading: false,
      allDataOptions: null,
      userDataOptions: null,
      title: '',
      unit: '',
      startRouter: ''
    }
  },
  watch: {
    $route: {
      handler() {
        this.init()
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const gameListData = gameList[this.$route.query.gameId - 1]
      this.title = gameListData.title
      this.unit = gameListData.unit
      document.title = `人类基准测试 - 仪表盘 - ${this.title}`
      this.startRouter = gameListData.path
      this.loading = true
      await this.getBestScore()
      await this.getChart()
      this.loading = false
    },
    draw() {
      // 初始化echarts实例
      let allDataChart = echartsInit(document.getElementById('allDataChart'))
      window.onresize = allDataChart.resize
      allDataChart.setOption(this.allDataOptions)

      if (!this.userDataOptions) return
      let userDataChart = echartsInit(document.getElementById('userDataChart'))
      window.onresize = userDataChart.resize
      userDataChart.setOption(this.userDataOptions)
    },
    // 获取最优分数
    async getBestScore() {
      if (!this.$store.state.userInfo.username) return
      const gameId = this.$route.query.gameId
      const gameItem = gameList[gameId - 1]
      const res = await this.$api.post('scores/getBestScore', {
        gameId,
        gte: gameItem.scoreRange[0],
        lte: gameItem.scoreRange[1],
        best: gameItem.best
      })
      if (res.code === 0) {
        this.score = res.data.bestScore
        this.percentile = res.data.percentile
      }
    },
    async getChart() {
      this.allDataOptions = await autoCreateChartOptions()
      if (this.$store.state.userInfo._id) this.userDataOptions = await autoCreateChartOptions(this.$store.state.userInfo._id)
      this.draw()
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
