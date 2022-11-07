import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false

// 全局注册接口请求$api
import { api } from './utils/api'
Vue.prototype.$api = api

// 按需引入ElementUI
import ElementUI from './flugins/element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Loading } from 'element-ui'
Vue.use(ElementUI)

// 全局导航守卫
;(() => {
  let timer = null
  let loading = null
  router.beforeEach((to, _from, next) => {
    timer = setTimeout(() => {
      loading = Loading.service({ fullscreen: true, lock: true, text: '页面跳转中' })
    }, 200)
    // 调用router中的数据更改title
    if (to.meta.title) document.title = to.meta.title
    else document.title = '人类基准测试'
    next()
  })
  router.afterEach(() => {
    clearTimeout(timer)
    loading.close()
  })
})()
;(async () => {
  try {
    if (store.state.userInfo.token) await store.dispatch('token')
  } finally {
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})()
