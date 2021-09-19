<template>
  <div class="index pages">
    <game-intro
      title="人类基准"
      intro="通过脑力游戏和认知测试来衡量您的才能"
      @start="$router.push('/reaction-time')"
     />
    <div class="game-list">
      <el-row justify="space-evenly">
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="(item, index) of gameList" :key="index">
          <game-item :icon="item.icon" :title="item.title" :intro="item.intro" :path="item.path"></game-item>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import GameIntro from '@/components/GameIntro.vue'
import GameItem from './components/GameItem.vue'
import { gameList } from './config/data'
export default {
  data() {
    return {
      gameList
    }
  },
  components: {
    GameIntro,
    GameItem
  }
}
</script>

<style lang="scss">
.index {
  .game-list {
    max-width: $max-width;
    margin: 0 auto;
  }
}
</style>