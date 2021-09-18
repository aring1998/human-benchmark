<template>
  <el-table :data="tableData" stripe :cell-style="{'color':'#333', 'font-size':'18px', 'font-weight':'bold'}">
    <el-table-column prop="title" label="测试"></el-table-column>
    <el-table-column prop="path" label="操作" min-width="150" align="center">
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="small"
          primary
          @click="$router.push(scope.row.path)"><i class="el-icon-video-play" />开始测试</el-button>
        <el-button
          type="primary"
          size="small"
          primary
          @click="$router.push(`/dashboard${scope.row.path}`)"><i class="el-icon-s-data" />查看纪录</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="score" label="分数" align="center" min-width="80"></el-table-column>
    <el-table-column prop="percentile" label="百分位">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.percentile"></el-progress>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: []
    }
  }
}
</script>

<style>

</style>
