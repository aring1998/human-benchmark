<template>
  <div class="btn-wrap">
    <button class="common-btn" @click="$emit('saveScore')" :disabled="disabled" v-loading="$store.state.loading">保存分数</button>
    <button class="common-btn secondary" @click="$emit('again')" :disabled="disabled">再试一次</button>
    <p class="appreciate" @click="modalShow = true"><i class="el-icon-coffee-cup"></i> 赞赏作者</p>
    <el-dialog class="appreciate-modal" title="赞赏作者" :visible="modalShow" @close="modalShow = false">
      <p>感谢您的游玩，如果您觉得网站有趣的话，欢迎支持我一下。</p>
      <div class="pay-type">
        <el-button :type="payType === 'wx' ? 'success' : ''" size="mini" @click="payType = 'wx'">微信</el-button>
        <el-button :type="payType === 'ali' ? 'primary' : ''" size="mini" @click="payType = 'ali'">支付宝</el-button>
      </div>
      <div class="pay-img">
        <img src="https://source.aring.cc/upload/wxpay-qrcode.png" alt="" v-show="payType === 'wx'" />
        <img src="https://source.aring.cc/upload/alipay-qrcode.png" alt="" v-show="payType === 'ali'" />
      </div>
      <el-button plain size="mini" @click="modalShow = false">下次一定</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
      modalShow: false,
      payType: 'wx',
    }
  },
  props: {
    disabledDuration: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.disabled = false
    }, this.disabledDuration)
  }
}
</script>

<style lang="scss">
.btn-wrap {
  width: 300px;
  display: flex;
  justify-content: space-around;
  .appreciate {
    font-size: 14px;
    position: absolute;
    bottom: -30px;
    color: #a0a0a0;
    cursor: pointer;
    i {
      font-size: 12px;
    }
    &:hover {
      text-decoration: underline;
      .el-icon-coffee-cup {
        text-decoration: underline;
      }
    }
  }
  .appreciate-modal {
    span {
      font-size: 12px;
    }
    i {
      font-size: 16px;
    }
    .el-dialog__header {
      text-align: left;
    }
    .btn-wrap {
      margin: 0 auto;
    }
    .pay-img {
      margin: 10px 0;
      img {
        width: 200px;
        height: 200px;
      }
    }
  }
}
@media screen and (max-width: 480px) {
  .btn-wrap {
    .appreciate-modal {
      .el-dialog {
        width: 90%;
      }
    }
  }
}
</style>
