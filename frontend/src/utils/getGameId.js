import router from '@/router'
import { gameList } from '@/views/index/config/data'

// 获取当前游戏ID
export const getGameId = () => {
  for (let i of gameList) {
    if (i.path === router.app._route.path)
      return i.id
  }
}