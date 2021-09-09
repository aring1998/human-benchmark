import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: () => {
        return '/index'
      }
    },
    {
      path: '/index',
      component: () => import('@/views/index/Index.vue')
    }
  ]
})
