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
      path: '/account',
      component: () => import('@/views/account/Index.vue'),
      children: [
        {
          path: '',
          redirect: 'login'
        },
        {
          path: 'login',
          component: () => import('@/views/account/login/Index.vue')
        },
        {
          path: 'register',
          component: () => import('@/views/account/register/Index.vue')
        },
        {
          path: 'forget',
          component: () => import('@/views/account/forget/Index.vue')
        }
      ]
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
      path: '/typing-test',
      component: () => import('@/views/typing-test/Index.vue')
    },
    {
      path: '/visual-memory',
      component: () => import('@/views/visual-memory/Index.vue')
    },
    {
      path: '/aim-test',
      component: () => import('@/views/aim-test/Index.vue')
    }
  ],
  // 切换路由滚动到页面顶部
  scrollBehavior() {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
