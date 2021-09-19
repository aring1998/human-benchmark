// 这里会遍历首页中的 gameList 自动生成路由
import { bigHumpNaming } from "@/utils/index"
import { gameList } from "@/views/index/config/data"

// 游戏页路由
const gameRoutes = gameList.map(item => {
  return {
    path: item.path,
    component: () => import(`@/views${item.path}/Index.vue`),
    meta: {
      title: `人类基准测试 - ${item.title}`
    }
  }
})
// 仪表盘对应游戏路由
const dashboardRoutes = gameList.map(item => {
  if (!item.path) return
  const path = item.path.replace('/', '')
  const componentName = bigHumpNaming(path)
  return {
    path,
    component: () => import(`@/views/dashboard/detail/game-record/${componentName}.vue`),
    meta: {
      title: `人类基准测试 - 仪表盘 - ${item.title}`
    }
  }
})
export { gameRoutes, dashboardRoutes }