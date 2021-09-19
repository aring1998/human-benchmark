<template>
  <div class="sequential-memory-game-wrap common-wrap" :class="{'suc': isSuc, 'fail': isSuc === false}">
    <div class="info">
      <div class="item">
        <span class="opacity keys">等级</span>
        <span>{{ $parent.$parent.level }}</span>
      </div>
    </div>
    <grid-table
      :cellData="cellData"
      :gridIndex="cellIndex"
      :classRule="{
        1: 'show',
        2: 'click-show'
      }"
      @clickCell="clickCell"
    ></grid-table>
  </div>
</template>

<script>
import { gridData } from '@/assets/js/gridData'
import { choiceCellIndex } from '../config/data'
import GridTable from '@/components/GridTable.vue'
export default {
  data() {
    return {
      life: 3,
      gridData,
      cellIndex: null,
      cellData: [],
      gameSequential: [],
      userSequential: [],
      canBeClick: false,
      clickCount: 0,
      isSuc: null
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
      this.canBeClick = false
      // 清理数组
      this.gameSequential.splice(0)
      this.userSequential.splice(0)
      this.clickCount = 0
      this.isSuc = null
      this.cellIndex = choiceCellIndex(this.$parent.$parent.level)
      // 根据等级深拷贝gridData中数据
      this.cellData = [...gridData[this.cellIndex].data]
      // 游戏单元格个数
      const cellNum = this.cellData.length
      setTimeout(() => { // 再次执行动画需要设定延迟
        for (let i = 1; i <= this.$parent.$parent.level; i++) {
          let randomNo = Math.floor(Math.random() * cellNum)
          setTimeout(() => {
            this.$set(this.cellData, randomNo, 1)
            this.gameSequential.push(randomNo)
            setTimeout(() => {  // 动画结束后清理该单元格动画
              this.$set(this.cellData, randomNo, 0)
            }, 900);
          }, i * 1000)
        }
      }, 10)
      // 等待动画播放完毕才可点击
      setTimeout(() => {
        this.canBeClick = true
      }, this.$parent.$parent.level * 1000 + 1000);
    },
    // 点击单元格
    clickCell(item, index) {
      if (!this.canBeClick) return
      // 记录点击单元格索引
      this.userSequential.push(index)
      // 比对游戏序列和用户点击序列
      if (this.gameSequential[this.clickCount] === this.userSequential[this.clickCount]) {
        // 点击改变背景颜色
        this.$set(this.cellData, index, 2)
        setTimeout(() => {  // 短暂延迟后恢复
          this.$set(this.cellData, index, 0)
        }, 150);
        this.clickCount++
        if (this.clickCount === this.$parent.$parent.level) {
          this.isSuc = true
          setTimeout(() => {
            this.$parent.$parent.level++
            this.randerCell()
          }, 500);
        }
      } else {
        this.isSuc = false
        setTimeout(() => {
          this.$parent.$parent.componentName = 'Result'
        }, 500);
      }
    }
  }
}
</script>

<style lang="scss">
.sequential-memory-game-wrap {
  padding: 0 30px;
  .info {
    width: unset;
  }
  &.suc::after {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    animation: sucTip .5s linear;
  }
  &.fail::after {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    animation: failTip .5s linear;
  }
  .grid-table {
    .show {
      animation: showCell 1s linear;
    }
    .click-show {
      background-color: #fff;
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
@keyframes sucTip {
  0% {
    background-color: unset;
  }
  50% {
    background-color: #fff;
  }
  100% {
    background-color: unset;
  }
}
@keyframes failTip {
  0% {
    background-color: unset;
  }
  50% {
    background-color: #f00;
  }
  100% {
    background-color: unset;
  }
}
</style>
