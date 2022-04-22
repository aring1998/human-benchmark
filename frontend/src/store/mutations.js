export default {
  setUserInfo(_, res) {
    if (res.code === 0) this.state.userInfo = res.data
    else window.localStorage.removeItem('human-benchmark-token')
  }
}