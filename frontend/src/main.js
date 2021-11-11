import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false

// 全局注册接口请求$api
import { api } from './utils/api'
Vue.prototype.$api = api

// 全局注册elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

;(async () => {
  if (store.state.userInfo.token) await store.dispatch('token')

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })

  // 全局导航守卫
  router.beforeEach((to, from, next) => {
    // 调用router中的数据更改title
    if (to.meta.length) document.title = to.meta.title
    else document.title = '人类基准测试'
    next()
  })
})()
