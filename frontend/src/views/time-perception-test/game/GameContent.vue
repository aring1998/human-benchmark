<template>
  <div class="time-perception-test-game-wrap common-wrap">
    <div class="tips">
      <span>提示：点击屏幕中的按钮，并根据按钮的数字在一定时间后再次点击按钮</span>
    </div>
    <div class="game-table">
      <el-button
        class="time-btn"
        plain
        v-for="(item, index) of timeList"
        :key="index"
        :type="item.btnType"
        @mousedown.native="firstClick(item)"
        :style="{ cursor: item.btnType === 'success' ? 'unset' : 'pointer' }"
      >
        <span v-show="!item.difTime">{{ item.val }}</span>
        <div class="result" v-show="item.difTime">
          <span>{{ (item.difTime / 1000).toFixed(2) }} / {{ item.val }}</span>
          <span>{{ ((item.difTime / 1000 / item.val) * 100).toFixed(2) }} %</span>
        </div>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeRange: [1, 2, 3, 4, 5],
      timeList: [],
      btnType: 'warning',
      clickCount: 0
    }
  },
  mounted() {
    this.randerButton()
  },
  methods: {
    randerButton() {
      for (let i = 0; i < 6; i++) {
        const randomNum = Math.floor(Math.random() * 5)
        this.timeList.push({
          val: this.timeRange[randomNum],
          index: i,
          time: null,
          difTime: null,
          btnType: 'warning'
        })
      }
    },
    firstClick(item) {
      const currentItem = this.timeList[item.index]
      if (currentItem.difTime) return
      if (!currentItem.time) {
        const nowTime = Date.now()
        currentItem.time = nowTime
        currentItem.btnType = 'danger'
      } else {
        this.secondClick(currentItem)
      }
    },
    secondClick(item) {
      item.difTime = Date.now() - item.time
      item.btnType = 'success'
      this.clickCount++
      if (this.clickCount === 6) {
        const timeObj = this.timeList.reduce(
          (pre, item) => ({
            valCount: (pre.valCount += Number(item.val)),
            difTimeCount: (pre.difTimeCount += Number(item.difTime / 1000))
          }),
          { valCount: 0, difTimeCount: 0 }
        )
        const { valCount, difTimeCount } = timeObj
        if (valCount > difTimeCount) this.$parent.$parent.score = Number(((difTimeCount / valCount) * 100).toFixed(2))
        else this.$parent.$parent.score = Number(((valCount / difTimeCount) * 100).toFixed(2))
        setTimeout(() => {
          this.$parent.$parent.componentName = 'result'
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss">
.time-perception-test-game-wrap {
  .tips {
    font-size: 16px;
    margin-bottom: 40px;
    padding: 0 15px;
  }
  .game-table {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20vw;
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 20px;
    .time-btn {
      height: 80px;
      font-size: 30px;
      font-weight: bold;
      width: calc(33% - 20px);
      border-radius: 20px;
      margin: 10px;
      .result {
        display: flex;
        flex-flow: column nowrap;
        span:nth-child(1) {
          font-size: 14px;
          margin-bottom: 6px;
        }
        span:nth-child(2) {
          font-size: 12px;
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .time-perception-test-game-wrap {
    .game-table {
      .time-btn {
        width: calc(50% - 20px);
      }
    }
  }
}
</style>
