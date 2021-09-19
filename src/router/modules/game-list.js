// 这里会遍历首页中的 gameList 自动生成路由
import { humpNaming } from "@/utils/index"
import { gameList } from "@/views/index/config/data"

// 游戏页路由
const gameRoutes = gameList.map(item => {
  return {
    path: item.path,
    component: () => import(`@/views${item.path}/Index.vue`)
  }
})
// 仪表盘对应游戏路由
const dashboardRoutes = gameList.map(item => {
  const componentName = humpNaming(item.path.replace('/', ''))
  return {
    path: item.path.replace('/', ''),
    component: () => import(`@/views/dashboard/detail/game-record/${componentName}.vue`)
  }
})
export { gameRoutes, dashboardRoutes }