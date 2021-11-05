import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import { dashboardRoutes, gameRoutes } from './modules/game-list'
import { accountRoutes } from './modules/account'
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
      component: () => import('@/views/index/Index.vue'),
      meta: {
        title: '人类基准测试'
      }
    },
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard/Index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/dashboard/detail/Index.vue'),
          meta: {
            title: '人类基准测试 - 仪表盘'
          }
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
        ...accountRoutes
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

// 处理路由的奇妙报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}