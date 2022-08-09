<template>
  <div class="visual-memory-game-wrap common-wrap">
    <div class="info">
      <div class="item">
        <span>{{ $parent.$parent.level }}</span>
        <span class="opacity keys">级</span>
      </div>
      <div class="item">
        <span class="opacity keys">生命</span>
        <span class="icon" v-for="item in 3" :key="item" :class="{ opacity: item > life }">♥</span>
      </div>
    </div>
    <grid-table
      :cellData="cellData"
      :gridIndex="cellIndex"
      :classRule="{
        1: 'show',
        2: 'wrong-click',
        3: 'right-click'
      }"
      @clickCell="clickCell"
    ></grid-table>
  </div>
</template>

<script>
import { gridData } from '@/assets/js/grid-data'
import { choiceCellIndex } from '../config/data'
import GridTable from '@/components/GridTable.vue'
export default {
  data() {
    return {
      life: 3,
      gridData,
      cellIndex: null,
      cellData: [],
      canBeClick: false
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
      this.cellIndex = choiceCellIndex(this.$parent.$parent.level)
      // 根据等级深拷贝gridData中数据
      this.cellData = [...gridData[this.cellIndex].data]
      // 游戏单元格个数
      const cellNum = this.cellData.length
      this.$nextTick(() => {
        // 再次执行动画需要设定延迟
        for (let i = -2; i < this.$parent.$parent.level; i++) {
          let randomNo = Math.floor(Math.random() * cellNum)
          // 防止赋值到已经存在值的单元格
          for (let j = 0; this.cellData[randomNo] === 1; j++) {
            randomNo = Math.floor(Math.random() * cellNum)
          }
          this.cellData[randomNo] = 1
        }
        setTimeout(() => {
          this.$forceUpdate()
        }, 50)
      })
      // 等待动画播放完毕才可点击
      setTimeout(() => {
        this.canBeClick = true
      }, 2000)
    },
    // 点击单元格
    clickCell(item, index) {
      if (item > 1 || !this.canBeClick) return
      this.$set(this.cellData, index, item + 2)
      this.$nextTick(() => {
        // 达成目标
        if (document.getElementsByClassName('right-click').length === this.$parent.$parent.level + 2) {
          if (this.$parent.$parent.level === 40) {
            this.$message.error('您是否作弊了呢？')
            return (this.$parent.$parent.componentName = 'Result')
          }
          setTimeout(() => {
            this.$parent.$parent.level++
            this.randerCell()
          }, 600)
        }
        // 错误达到3次
        if (document.getElementsByClassName('wrong-click').length === 3) {
          this.canBeClick = false
          this.life--
          setTimeout(() => {
            if (this.life === 0) return (this.$parent.$parent.componentName = 'Result')
            this.randerCell()
          }, 600)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.visual-memory-game-wrap {
  padding: 0 30px;
  .grid-table {
    .show {
      animation: showCell 2s linear;
    }
    .right-click {
      animation: rotateCell 0.3s linear;
      background-color: #fff;
    }
    .wrong-click {
      animation: shakeCell 0.3s linear;
      background-color: #00000080;
    }
  }
}
@keyframes showCell {
  0% {
    background-color: rgba($color: #006, $alpha: 0.15);
  }
  30%,
  80% {
    background-color: rgba($color: #fff, $alpha: 1);
  }
  100% {
    background-color: rgba($color: #006, $alpha: 0.15);
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
    transform: translate(0, 0);
  }
  33% {
    transform: translate(5px, 0);
  }
  100% {
    transform: translate(-5px, 0);
  }
}
</style>
