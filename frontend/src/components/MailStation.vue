<template>
  <div class="mail-station" v-if="stationShow">
    <div class="mail-wrap" @click.stop="noticeShow = true">
      <el-badge :value="unreadNotice" :hidden="unreadNotice === 0">
        <i class="el-icon-message"></i>
      </el-badge>
    </div>
    <el-dialog class="notice-wrap" title="站内信" :visible="noticeShow" :before-close="closeNotice">
      <el-carousel height="350px" trigger="click" :autoplay="false" indicator-position="outside">
        <el-carousel-item v-for="item of noticeList" :key="item.id">
          <div class="notice-content">
            <h4>{{ item.title }}</h4>
            <p v-for="(content, index) of item.content" :key="index">
              <span v-html="content.text"></span>
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
export default {
  data() {
    return {
      stationShow: false,
      noticeShow: false,
      noticeList: [],
      unreadNotice: 0,
    }
  },
  mounted() {
    this.getNotice()
  },
  methods: {
    async getNotice() {
      const noticeList = JSON.parse(localStorage.getItem('noticeList') || '[]')
      const res = await this.$api.get('notices/getNotices')
      if (res.code === 0) {
        const data = res.data
        if (data.length) this.stationShow = true
        this.unreadNotice = data.filter((item) => !noticeList.includes(item._id)).length
        this.noticeList = data
      }
    },
    closeNotice() {
      this.noticeShow = false
      if (!this.noticeList.length) return
      localStorage.setItem('noticeList', JSON.stringify(this.noticeList.map((item) => item._id) || []))
      this.unreadNotice = 0
    },
  },
}
</script>

<style lang="scss">
.mail-station {
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
  .notice-wrap {
    .el-dialog {
      width: 70%;
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
  .mail-station {
    .notice-wrap {
      .el-dialog {
        width: 90%;
      }
      .notice-content {
        padding: 0 10px;
      }
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
