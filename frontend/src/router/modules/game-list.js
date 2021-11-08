// 这里会遍历首页中的 gameList 自动生成路由
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
export { gameRoutes }