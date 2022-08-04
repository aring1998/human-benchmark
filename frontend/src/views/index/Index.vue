<template>
  <div class="index pages">
    <game-intro title="人类基准" intro="通过脑力游戏和认知测试来衡量您的才能" @start="$router.push('dashboard')" />
    <div class="game-list">
      <el-row justify="space-evenly">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="(item, index) of gameList" :key="index">
          <game-item :icon="item.icon" :title="item.title" :intro="item.intro" :path="item.path"></game-item>
        </el-col>
      </el-row>
    </div>
    <mail-station></mail-station>
  </div>
</template>

<script>
import GameIntro from '@/components/GameIntro.vue'
import MailStation from '@/components/MailStation.vue'
import { debounce } from '@/utils/index'
import GameItem from './components/GameItem.vue'
import { gameList } from './config/data'
export default {
  data() {
    return {
      gameList,
      noticeShow: false,
      noticeList: [],
      unreadNotice: 0
    }
  },
  components: {
    GameIntro,
    GameItem,
    MailStation
  },
  mounted() {
    this.$nextTick(() => {
      // 滚动到原先滚动到的位置
      document.documentElement.scrollTo({
        top: window.sessionStorage.getItem('indexScroll'),
        behavior: 'smooth'
      })

      // 通过监听滚动条记录滚动位置
      window.onscroll = debounce(() => {
        window.sessionStorage.setItem('indexScroll', document.documentElement.scrollTop)
      }, 100)
      this.$once('hook:beforeDestroy', () => {
        window.onscroll = null
      })
    })
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
