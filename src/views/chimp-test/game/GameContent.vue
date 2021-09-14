<template>
  <div class="chimp-test-game-wrap common-wrap">
    <div class="chimp-test-table">
      <div 
        v-for="(item, index) of gameData"
        :key="index"
        class="cell"
        :class="{ 'cell-border': item !== 0, 'cell-shade': isHide }"
        @click="clickCell(item, index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { gameData } from '../config/data'
export default {
  data() {
    return {
      gameData: [...gameData], // 深拷贝数组
      clickCount: 1,
      isHide: false
    }
  },
  watch: {
    clickCount: {
      handler(val) {
        // 第一次点击且不为第一关时，隐藏单元格
        if (this.$parent.$parent.level > 4 && val > 1) this.isHide = true
      }
    }
  },
  mounted() {
    this.randerCell()
  },
  methods: {
    // 渲染单元格
    randerCell() {
      this.gameData = [...gameData]
      // 随机设定数组
      for (let i = 1; i <= this.$parent.$parent.level; i++) {
        let randomNo = Math.floor(Math.random() * 39)
        // 防止赋值到已经存在值的单元格
        for (let j = 0; this.gameData[randomNo] !== 0; j++) {
          randomNo = Math.floor(Math.random() * 39)
        }
        this.$set(this.gameData, randomNo, i)
      }
    },
    // 点击单元格
    clickCell(item, index) {
      if (item === this.clickCount) {
        this.$set(this.gameData, index, 0)
        // 如果点击次数达到等级数
        if (this.clickCount === this.$parent.$parent.level) {
          this.$parent.$parent.isSuc = true
          this.$parent.$parent.tryCount = 0
          this.$parent.$parent.componentName = 'Result'
        }
        this.clickCount++
      } else {
        this.$parent.$parent.isSuc = false
        this.$parent.$parent.tryCount++
        this.$parent.$parent.componentName = 'Result'
      }
    }
  }
}
</script>

<style lang="scss">
.chimp-test-game-wrap {
  .chimp-test-table {
    max-width: $max-width;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    .cell {
      width: 80px;
      height: 80px;
      border: 5px solid rgba(0, 0, 0, 0);
      border-radius: 8px;
      margin: 5px;
      opacity: 0;
      box-sizing: border-box;
      font-size: 25px;
      font-weight: 900;
      color: #fff;
      user-select: none; /* 禁止选中 */
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
      &:hover {
        border: 5px solid rgba(255, 255, 255, 0.5);
      }
    }
    .cell-border {
      border: 5px solid rgba(255, 255, 255, 0.1);
      opacity: 1;
      cursor: pointer;
      pointer-events: unset;
      &.cell-shade {
        background-color: #fff;
        border: 3px #fff solid;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .chimp-test-game-wrap {
    padding: 0 30px;
    .chimp-test-table {
      justify-content: space-around;
      .cell {
        width: 40px;
        height: 40px;
        font-size: 18px;
      }
    }
  }
}
</style>
