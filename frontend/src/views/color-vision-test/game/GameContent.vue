<template>
  <div class="color-vision-test-game-wrap common-wrap">
    <div class="info">
      <div class="item">
        <span>{{ $parent.$parent.level }}</span>
        <span class="opacity keys">级</span>
      </div>
      <div class="item">
        <span>{{ time.toFixed(1) }}s</span>
      </div>
    </div>
    <grid-table
      :cellData="cellData"
      :gridIndex="cellIndex"
      :bgColorRule="{
        0: `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`,
        1: `rgb(${this.difColor.red}, ${this.difColor.green}, ${this.difColor.blue})`
      }"
      @clickCell="clickCell"
    ></grid-table>
  </div>
</template>

<script>
import GridTable from '@/components/GridTable.vue'
import { deepCloneObj } from '@/utils/index'
import { gridData } from '@/assets/js/grid-data'
import { choiceCellIndex, choiceChangeValue } from '../config/data'
export default {
  data() {
    return {
      life: 3,
      gridData,
      cellIndex: null,
      cellData: [],
      timer: null,
      time: 15,
      color: {
        red: 0,
        green: 0,
        blue: 0
      },
      difColor: {
        red: 0,
        green: 0,
        blue: 0
      },
      changeValue: 30
    }
  },
  components: {
    GridTable
  },
  mounted() {
    this.randerCell()
  },
  methods: {
    // 渲染单元格
    randerCell() {
      this.cellIndex = choiceCellIndex(this.$parent.$parent.level)
      this.cellData = [...gridData[this.cellIndex].data]
      this.changeValue = choiceChangeValue(this.$parent.$parent.level)
      const randomIndex = Math.floor(Math.random() * (this.cellData.length - 1))
      this.$set(this.cellData, randomIndex, 1)
      for (let key in this.color) {
        this.color[key] = Math.floor(Math.random() * 255)
      }
      // 选其中一种颜色变化
      const keys = ['red', 'green', 'blue']
      this.difColor = deepCloneObj(this.color)
      // 取比重最大的颜色进行变化
      const difColorValues = Object.values(this.difColor)
      const maxIndex = difColorValues.indexOf(Math.max(...difColorValues))
      // 随机变明/变暗
      let changeType = Math.floor(Math.random() * 1)
      // 防止rgb值溢出
      if (this.difColor[keys[maxIndex]] - this.changeValue < 0) changeType = 0
      if (this.difColor[keys[maxIndex]] + this.changeValue > 255) changeType = 1
      if (changeType === 1) {
        this.difColor[keys[maxIndex]] -= this.changeValue
      }
      else {
        this.difColor[keys[maxIndex]] += this.changeValue
      }
      this.timer = setInterval(() => {
        this.time -= 0.1
        if (this.time < 0) this.clickCell(0)
      }, 100)
    },
    // 点击单元格
    clickCell(item) {
      clearInterval(this.timer)
      if (item === 1) {
        this.time = 15
        this.$parent.$parent.level++
        this.randerCell()
      } else {
        this.$parent.$parent.componentName = 'Result'
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss">
.color-vision-test-game-wrap {
  padding: 0 30px;
  .grid-table {
    .show {
      animation: showCell 2s linear;
    }
    .right-click {
      animation: rotateCell .3s linear;
      background-color: #fff;
    }
    .wrong-click {
      animation: shakeCell .3s linear;
      background-color: #00000080;
    }
  }
}
@media screen and (max-width: 480px) {
  .color-vision-test-game-wrap {
    .info {
      font-size: 24px;
      .item {
        .icon {
          font-size: 28px;
        }
      }
    }
  }
}
@keyframes showCell {
  0% {
    background-color: rgba($color: #006, $alpha: .15);
  }
  30%,
  80% {
    background-color: rgba($color: #fff, $alpha: 1);
  }
  100% {
    background-color: rgba($color: #006, $alpha: .15);
  }
}
@keyframes rotateCell {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(180deg);
  }
}
@keyframes shakeCell {
  0% {
    position: relative;
    left: 0;
  }
  33% {
    position: relative;
    left: -5px;
  }
  100% {
    position: relative;
    left: 5px;
  }
}
</style>
