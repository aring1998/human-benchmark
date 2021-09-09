<template>
  <div class="base-layout">
    <slot name="wrap"></slot>
    <div class="card">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="item">
            <h4>统计数据</h4>
            <div id="myChart" style="height: 300px; width: 100%; border-radius: 10px"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="item">
            <h4>关于</h4>
            <slot name="about"></slot>
          </div>
        </el-col>
      </el-row>
      
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    cartOption: Object
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      // 初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      const option = {
        xAxis: {
          type: 'category',
          data: ['0ms', '25ms', '50ms', '75ms', '100ms', '125ms', '150ms','175ms','200ms']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
      }]
      }
      // 防止越界，重绘echarts（例如屏幕缩小，图标随屏幕适应）
      window.onresize = myChart.resize
      myChart.setOption(option) //设置option
    }
  }
}
</script>

<style lang="scss">
.base-layout {
  .card {
    display: flex;
    max-width: $max-width;
    margin: 50px auto 0 auto;
    .item {
      height: 630px;
      background-color: #fff;
      box-shadow: $shadow;
      flex: 1;
      border-radius: 5px;
      padding: 20px;
      &:nth-child(1) {
        margin-right: 30px;
        flex-shrink: 0;
      }
      h4 {
        font-size: 27px;
        font-weight: 500;
        margin: 0;
      }
      p {
        font-size: 18px;
        margin: 5px 0;
      }
    }
  }
  .el-row {
    width: 100%;
  }
}
</style>