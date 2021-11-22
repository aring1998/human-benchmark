<template>
  <div class="aim-test-game-wrap common-wrap">
    <div class="info">
      <span class="opaacity">剩余</span>
      <span>{{ surplus }}</span>
    </div>
    <div class="game-content" ref="gameContent">
      <div class="icon-wrap" :style="{ 'top': `${top}px`, 'left': `${left}px` }" ref="target">
        <i
          class="el-icon-aim"
          :class="{ 'anim': animAgain }"
          @click="targetChange"
          @click.once="firstClick"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      surplus: 31,
      top: 0,
      left: 0,
      animAgain: true
    }
  },
  mounted() {
    this.targetChange()
  },
  methods: {
    firstClick() {
      this.$parent.$parent.time = new Date().getTime()
    },
    targetChange() {
      this.animAgain = false
      setTimeout(() => {
        this.animAgain = true
      })
      // 随机的高度区间为，固定游戏框高度350 - 目标宽度
      this.top = Math.random() * (350 - this.$refs.target.clientWidth)
      // 随机的宽度区间为，游戏框宽度 - 目标宽度
      this.left = Math.random() * (this.$refs.gameContent.clientWidth - this.$refs.target.clientWidth)
      this.surplus--
      if (this.surplus == 0) {
        this.$parent.$parent.componentName = 'Result'
        this.$parent.$parent.time = new Date().getTime() - this.$parent.$parent.time
      }
    }
  }
}
</script>

<style lang="scss">
.aim-test-game-wrap {
  .info {
    color: #fff;
    font-size: 28px;
    margin-bottom: 30px;
    width: 100px;
    display: flex;
    justify-content: space-between;
    .opaacity {
      opacity: .7;
    }
  }
  .game-content {
    width: $max-width;
    height: 350px;
    position: relative;
    .icon-wrap {
      position: absolute;
      height: 100px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      i {
        font-size: 100px;
        cursor: pointer;
        &.anim {
          animation: iconShowPC .2s linear;
        }
      }
    }
  }
}
@media screen and (max-width: 480px) {
  .aim-test-game-wrap {
    padding: 0 30px;
    .game-content {
      width: calc(100vw - 60px);
      .icon-wrap {
        width: 40px;
        height: 40px;
        i {
          font-size: 40px;
          &.anim {
            animation: iconShowMob .2s linear;
          }
        }
      }
    }
  }
}
@keyframes iconShowPC {
  0% {
    font-size: 12px;
  }
  100% {
    font-size: 100px;
  }
}
@keyframes iconShowMob {
  0% {
    font-size: 12px;
  }
  100% {
    font-size: 40px;
  }
}
</style>
