<template>
  <div class="index">
    <div class="intro">
      <i class="el-icon-s-promotion"></i>
      <h2>人类基准</h2>
      <span>通过脑力游戏和认知测试来衡量您的能力</span>
      <button class="common-btn">开始</button>
    </div>
    <div class="game-list">
      <el-row :gutter="10" justify="space-evenly">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-for="(item, index) of gameList" :key="index">
          <game-item :icon="item.icon" :title="item.title" :intro="item.intro"></game-item>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import GameItem from './components/GameItem.vue'
import { gameList } from './config/data'
export default {
  data() {
    return {
      gameList
    }
  },
  components: {
    GameItem
  }
}
</script>

<style lang="scss">
.index {
  background-color: #e6e8f4;
  .intro {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 480px;
    color: #fff;
    background-color: $main-color;
    text-align: center;
    padding: 0 20px;
    i {
      font-size: 120px;
    }
    h2 {
      font-size: 40px;
    }
    span {
      font-size: 25px;
      margin-bottom: 30px;
    }
  }
}
.game-list {
  max-width: $max-width;
  margin: 0 auto;
}
</style>