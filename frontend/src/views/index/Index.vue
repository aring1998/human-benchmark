<template>
  <div class="index pages">
    <game-intro title="人类基准" intro="通过脑力游戏和认知测试来衡量您的才能" @start="$router.push('dashboard')" />
    <div class="game-list">
      <el-row justify="space-evenly">
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="(item, index) of gameList" :key="index">
          <game-item :icon="item.icon" :title="item.title" :intro="item.intro" :path="item.path"></game-item>
        </el-col>
      </el-row>
    </div>
    <div class="mail-wrap" @click.stop="noticeShow = true" v-show="noticeList.length">
      <el-badge :value="noticeList.length">
        <i class="el-icon-message"></i>
      </el-badge>
    </div>
    <el-dialog title="公告" :visible="noticeShow" width="70%" :before-close="closeNotice">
      <el-carousel height="350px" trigger="click" :autoplay="false" indicator-position="outside">
        <el-carousel-item v-for="item of noticeList" :key="item.id">
          <div class="notice-content">
            <h4>{{ item.title }}</h4>
            <p v-for="(content, index) of item.content" :key="index">
              {{ content.text }}
              <router-link v-if="content.routerName" :to="content.routerPath">{{ content.routerName }}</router-link>
            </p>
            <div class="img-wrap" v-if="item.mainImg">
              <el-image :src="item.mainImg" :preview-src-list="item.imgList"> </el-image>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
      <span slot="footer" style="text-align: center">
        <el-button type="success" plain @click="closeNotice">我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GameIntro from '@/components/GameIntro.vue'
import { debounce } from '@/utils/index'
import GameItem from './components/GameItem.vue'
import { gameList } from './config/data'
export default {
  data() {
    return {
      gameList,
      noticeShow: false,
      noticeList: []
    }
  },
  components: {
    GameIntro,
    GameItem
  },
  mounted() {
    this.getNotice()
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
  },
  methods: {
    async getNotice() {
      const noticeList = JSON.parse(localStorage.getItem('noticeList') || '[]')
      const res = await this.$api.get('notices/getNotices')
      const data = res.data
      if (res.code === 0) {
        for (let i in data) {
          for (let j of noticeList) {
            if (data[i]._id === j) data.splice(i, 1)
          }
        }
        this.noticeList = data
      }
    },
    closeNotice() {
      this.noticeShow = false
      if (!this.noticeList.length) return
      localStorage.setItem('noticeList', JSON.stringify(this.noticeList.map(item => item._id) || ''))
      this.noticeList = []
    }
  }
}
</script>

<style lang="scss">
.index {
  .game-list {
    max-width: $max-width;
    margin: 0 auto;
  }
  .mail-wrap {
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: $shadow;
    padding: 10px;
    border-radius: 50%;
    position: fixed;
    bottom: 80px;
    right: 60px;
    cursor: pointer;
    &:hover {
      i {
        color: $main-color;
      }
    }
    i {
      font-size: 30px;
    }
  }
  .notice-content {
    padding: 0 50px;
    overflow: auto;
    h4 {
      font-size: 20px;
      text-align: center;
      margin: 12px 0;
    }
    p {
      font-size: 18px;
      text-indent: 36px;
      margin: 8px 0;
      line-height: 1.5;
    }
    .img-wrap {
      text-align: center;
      img {
        width: 20%;
      }
    }
  }
  .el-carousel__container {
    padding: 0 30px;
    border-radius: 30px;
  }
  .el-carousel__indicator--horizontal {
    .el-carousel__button {
      background-color: $main-color;
    }
  }
  .el-carousel__item.is-active {
    overflow: auto;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
@media screen and (min-width: 480px) {
  .el-carousel__item.is-active {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: #c0c4cc;
    }
  }
}
@media screen and (max-width: 480px) {
  .index {
    .notice-content {
      padding: 0 10px;
    }
    .el-carousel__arrow {
      display: none;
    }
    .notice-content {
      .img-wrap {
        img {
          width: 100%;
        }
      }
    }
    .mail-wrap {
      right: 30px;
    }
  }
}
</style>
