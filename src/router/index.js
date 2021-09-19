import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import { dashboardRoutes, gameRoutes } from './modules/game-list'
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
      path: '/dashboard',
      component: () => import('@/views/dashboard/Index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/dashboard/detail/Index.vue')
        },
        ...dashboardRoutes
      ]
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
        },
        {
          path: 'opinion',
          component: () => import('@/views/account/opinion/Index.vue')
        }
      ]
    },
    ...gameRoutes
  ],
  // 切换路由滚动到页面顶部
  scrollBehavior() {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
