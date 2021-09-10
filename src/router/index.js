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
    },
    {
      path: '/reaction-time',
      component: () => import('@/views/reaction-time/Index.vue')
    },
    {
      path: '/number-memory',
      component: () => import('@/views/number-memory/Index.vue')
    },
    {
      path: '/chimp-test',
      component: () => import('@/views/chimp-test/Index.vue')
    },
    {
      path: '/typing',
      component: () => import('@/views/typing/Index.vue')
    }
  ],
  // 切换路由滚动到页面顶部
  scrollBehavior() {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
