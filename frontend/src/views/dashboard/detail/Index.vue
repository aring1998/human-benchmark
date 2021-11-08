<template>
  <div class="card-wrap">
    <div class="card user-info">
      <span class="opacity">用户名</span>
      <span class="keys">{{ $store.state.userInfo.username || '访客' }}</span>
      <span v-if="!$store.state.userInfo.username">
        <router-link to="/account/login">登录</router-link>
        或
        <router-link to="/account/register">注册</router-link>
        以保存您的测试结果
      </span>
    </div>
    <div class="card hide-on-mob">
      <record-table :tableData="tableData" v-loading="loading" />
    </div>
    <div class="card hide-on-pc">
      <record-list :tableData="tableData" v-loading="loading" />
    </div>
  </div>
</template>

<script>
import { tableData } from './config/data'
import RecordTable from './components/RecordTable.vue'
import RecordList from './components/RecordList.vue'
import { gameList } from '../../index/config/data'
export default {
  data() {
    return {
      tableData,
      loading: false
    }
  },
  components: {
    RecordTable,
    RecordList
  },
  created() {
    if (this.$store.state.userInfo.username) this.getBestScore()
  },
  methods: {
    async getBestScore() {
      this.loading = true
      const res = await this.$api.get('scores/getBestScore', {
        gameCount: 13
      })
      this.loading = false
      if (res.code === 0) {
        const data = res.data.map(item => {
          let score
          let percentile
          if (gameList[item.gameId - 1].best) {
            score = item.maxScore || '?'
            percentile = item.maxPercentile || 0
          } else {
            score = item.minScore || '?'
            percentile = item.minPercentile || 0
          }
          return {
            ...tableData[item.gameId - 1],
            score,
            percentile
          }
        })
        this.tableData = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  flex-flow: column nowrap;
  font-size: 18px;
  .opacity {
    opacity: .6;
    margin-bottom: 4px;
  }
  .keys {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }
}
</style>