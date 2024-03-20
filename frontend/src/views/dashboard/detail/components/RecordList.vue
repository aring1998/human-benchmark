<template>
  <div class="record-list">
    <div class="item" v-for="(item, index) of tableData" :key="index">
      <div class="info">
        <span>{{ item.title }}</span>
        <router-link :to="item.path"><i class="el-icon-video-play" />开始测试</router-link>
        <router-link :to="`/dashboard/game-record?gameId=${item.id}`"><i class="el-icon-s-data" />查看纪录</router-link>
      </div>
      <div class="record">
        <span>{{ item.score }}</span>
        <el-progress :text-inside="true" :stroke-width="22" :percentage="item.percentile" text-color="#fff"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss">
.record-list {
  display: flex;
  flex-flow: column nowrap;
  color: #333;
  .item {
    display: flex;
    justify-content: space-between;
    flex: 1;
    margin-bottom: 15px;
    .info {
      display: flex;
      flex-flow: column nowrap;
      margin-right: 40px;
      span {
        font-size: 22px;
        font-weight: bold;
        margin: 4px 0;
      }
      a {
        font-size: 18px;
        margin: 2px 0;
      }
    }
    .record {
      width: 35%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-evenly;
      span {
        font-size: 20px;
        font-weight: 900;
        text-align: right;
      }
    }
  }
}
</style>