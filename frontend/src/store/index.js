import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import getters from '@/store/getters'
import actions from '@/store/actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      _id: '',
      username: '',
      token: '' || window.localStorage.getItem('human-benchmark-token')
    },
    loading: false
  },
  mutations,
  getters,
  actions,
  mudules: {}
})

// 导出
export default store
