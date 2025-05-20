<template>
  <div class="schulte-grid-game-wrap common-wrap">
    <div class="schulte-grid-table">
      <div
        v-for="item of gameData"
        :key="item"
        class="cell cell-border"
        :class="{ 'cell-clicked': clickList.includes(item) }"
        @click="clickCell(item)"
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
      clickList: [],
      isStart: false,
      timer: null,
      startTime: 0,
    }
  },
  mounted() {
    this.randerCell()
  },
  methods: {
    // 渲染单元格
    randerCell() {
      this.gameData = [...gameData]
      this.gameData.sort(() => Math.random() - 0.5)
    },
    // 点击单元格
    clickCell(item) {
      if (item === 1) {
        this.startTime = Date.now()
      }
      if (item === this.clickCount) {
        this.clickList.push(item)
        if (this.clickCount === this.gameData.length) {
          this.$parent.$parent.useTime = Date.now() - this.startTime
          this.$parent.$parent.componentName = 'Result'
        }
        this.clickCount++
      }
    },
  },
}
</script>

<style lang="scss">
.schulte-grid-game-wrap {
  .schulte-grid-table {
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    .cell {
      width: 70px;
      height: 70px;
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
        border: 5px solid rgba(255, 255, 255, 0.9);
      }
    }
    .cell-border {
      border: 5px solid rgba(255, 255, 255, 0.5);
      opacity: 1;
      cursor: pointer;
      pointer-events: unset;
      &.cell-clicked {
        background-color: rgba(255, 255, 255, 0.9);
        border-color: rgba(255, 255, 255, 0.9);
        color: #333;
        cursor: unset;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .schulte-grid-game-wrap {
    padding: 0 30px;
    .schulte-grid-table {
      justify-content: space-around;
      width: 350px;
      .cell {
        width: 60px;
        height: 60px;
        font-size: 18px;
      }
    }
  }
}
</style>
