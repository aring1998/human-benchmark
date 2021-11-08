import { api } from '@/utils/api'
import { Message } from 'element-ui'
import { getGameId } from '@/utils/game-config'

export default {
  async token() {
    const res = await api.post('users/token')
    if (res.code === 0) this.state.userInfo = res.data
    else window.localStorage.removeItem('token')
  },
  // 保存分数
  saveScore(_, score) {
    const gameId = getGameId()
    if (!gameId) return Message.error('页面异常，请尝试刷新页面')
    return api.post('scores/saveScore', { gameId, score })
  }
}