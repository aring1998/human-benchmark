import { api } from '@/utils/api'
export default {
  async token() {
    const res = await api.post('users/token')
    if (res.code === 0) {
      this.state.userInfo = res.data
    }
  }
}