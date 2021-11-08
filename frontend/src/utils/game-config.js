import router from '@/router'
import { gameList } from '@/views/index/config/data'
import { createChartOptions } from './index'
import { api } from './api'

// 获取当前游戏ID
export const getGameId = () => {
  for (let i of gameList) {
    if (i.path === router.app._route.path || `/dashboard${i.path}` === router.app._route.path)
      return i.id
  }
}

// 自动创建图表配置
export const autoCreateChartOptions = async () => {
  const gameId = getGameId()
  console.log(gameList[gameId - 1]);
  const range = gameList[gameId - 1].scoreRange
  if (!range) return
  const chartOptions = createChartOptions(range[0], range[1])
  console.log(range, gameId);
  const res = await api.get('scores/getChartData', { gameId, gte: range[0], lte: range[1] })
  if (res.code === 0) {
    // 对无对应X轴键值的数据做补零处理
    const keys = chartOptions.xAxis.data
    const yAxis = []
    for (let i in keys) {
      for (let j in res.data) {
        if (keys[i] == res.data[j]?._id) yAxis.push(res.data[j].count)
      }
      if (!yAxis[i]) yAxis.push(0)
    }
    chartOptions.series[0].data = yAxis
  }
  return chartOptions
}