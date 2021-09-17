<template>
  <div class="grid-table">
    <div
      class="cell"
      v-for="(item, index) of cellData"
      :key="index"
      :style="{
        'height': `calc(100% / ${gridData[gridIndex].grid} - 10px )`,
        'width': `calc(100% / ${gridData[gridIndex].grid} - 10px )`
      }"
      :class="randerClass(item)"
      @click="clickCell(item, index)"
    ></div>
  </div>
</template>

<script>
import { gridData } from '@/assets/js/gridData'
export default {
  data() {
    return {
      gridData
    }
  },
  props: {
    cellData: Array, // 表格数据
    gridIndex: Number, // 表格数据索引
    /**
     * @classRule 渲染class规则
     * 写法：
     * {
     *   1: 'aaa',
     *   2: 'bbb'
     * }
     * 对象中 key 对应 v-for 中 item === key , 对象中 vlaue 对应 item === key 的返回值
     */
    classRule: Object
  },
  computed: {
    randerClass() {
      return function(item) {
        return this.classRule[item]
      }
    }
  },
  methods: {
    clickCell(item, index) {
      this.$emit('clickCell', item, index)
    }
  }
}
</script>

<style lang="scss">
.grid-table {
  width: 350px;
  height: 350px;
  display: flex;
  flex-flow: row wrap;
  .cell {
    margin: 5px;
    background-color: rgba($color: #000066, $alpha: .15);
    border-radius: 5px;
    cursor: pointer;
  }
}
@media screen and (max-width: 350px) {
  .grid-table {
    width: 300px;
    height: 300px;
  }
}
</style>