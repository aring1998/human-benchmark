import router from '@/router'
import { gameList } from '@/views/index/config/data'
import { createChartOptions } from './index'
import { api } from './api'

// 获取当前游戏ID
export const getGameId = () => {
  const routerGameId = router.app._route.query.gameId
  if (routerGameId) return routerGameId
  for (let i of gameList) {
    if (i.path === router.app._route.path) return i.id
  }
}

// 自动创建图表配置
export const autoCreateChartOptions = async userId => {
  const gameId = getGameId()
  const range = gameList[gameId - 1].scoreRange
  const section = gameList[gameId - 1].section
  if (!range) return
  const chartOptions = createChartOptions(range[0], range[1], section)
  const res = await api.get('scores/getChartData', { gameId, userId, gte: range[0], lte: range[1], section })
  if (res.code === 0) {
    // 对无对应X轴键值的数据做补零处理
    const keys = chartOptions.xAxis.data
    const resDict = res.data.reduce((pre, { _id, count }) => {
      pre[_id] = count
      return pre
    }, {})
    const yAxis = keys.map(value => resDict[value] || 0)
    chartOptions.series[0].data = yAxis
  }
  return chartOptions
}
