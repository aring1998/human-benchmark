<template>
  <div class="base-layout">
    <slot name="wrap"></slot>
    <div class="card">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="item">
            <h4>统计数据</h4>
            <div id="myChart" style="height: 300px; width: 100%;"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="item about">
            <h4>关于</h4>
            <p v-for="(item, index) of aboutText" :key="index">
              {{ item }}
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 图标配置项
    chartOptions: Object,
    // 关于的文本，写作数组以分段
    aboutText: {
      type: Array,
      default: ''
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      // 初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 防止越界，重绘echarts（例如屏幕缩小，图标随屏幕适应）
      window.onresize = myChart.resize
      myChart.setOption(this.chartOptions) //设置option
    }
  }
}
</script>

<style lang="scss">
.base-layout {
  .card {
    display: flex;
    width: 100%;
    max-width: $max-width;
    margin: 50px auto 0 auto;
    .item {
      height: 630px;
      background-color: #fff;
      box-shadow: $shadow;
      flex: 1;
      border-radius: 5px;
      padding: 20px 30px;
      margin: 0 auto;
      h4 {
        font-size: 27px;
        font-weight: 500;
        margin: 0;
      }
      &.about {
        p {
          font-size: 18px;
          margin: 15px 0;
          text-align: justify;
        }
      }
    }
  }
  .el-row {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .base-layout {
    .card {
      .item {
        margin: 0;
        box-sizing: border-box;
        width: 100vw;
        margin-bottom: 20px;
        border-radius: unset;
      }
    }
  }
}
</style>