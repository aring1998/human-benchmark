<template>
  <div class="card-wrap">
    <div class="card user-info">
      <span class="opacity">用户名</span>
      <span class="keys">{{ $store.state.userInfo.username }}</span>
      <span v-if="$store.state.userInfo.username === '访客'">
        <router-link to="/account/login">登录</router-link>
        或
        <router-link to="/account/register">注册</router-link>
        以保存您的测试结果
      </span>
    </div>
    <div class="card hide-on-mob">
      <record-table :tableData="tableData" />
    </div>
    <div class="card hide-on-pc">
      <record-list :tableData="tableData" />
    </div>
  </div>
</template>

<script>
import { tableData } from './config/data'
import RecordTable from './components/RecordTable.vue'
import RecordList from './components/RecordList.vue'
export default {
  data() {
    return {
      tableData
    }
  },
  components: {
    RecordTable,
    RecordList
  },
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  flex-flow: column nowrap;
  font-size: 18px;
  .opacity {
    opacity: .6;
  }
  .keys {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }
}
</style>