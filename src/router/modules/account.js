import { Message } from 'element-ui'
import store from '@/store'

// 在此处配置路由信息，会自动生成账户相关页面路由
const accountList = [
  {
    path: 'login',
    title: '登录'
  },
  {
    path: 'register',
    title: '注册'
  },
  {
    path: 'forget',
    title: '忘记密码'
  },
  {
    path: 'opinion',
    title: '意见反馈'
  }
]
export const accountRoutes = accountList.map(item => {
  return {
    path: item.path,
    component: () => import (`@/views/account/detail/${item.path}/Index.vue`),
    meta: {
      title: `人类基准测试 - ${item.title}`
    },
    beforeEnter: (to, from, next) => {
      // 已登录不能进入登录/注册页面
      if (to.path === '/account/login' || to.path === '/account/register') {
        if (store.state.userInfo.username) {
          Message.error('请先退出登录')
          next('/index')
        }
      }
      next()
    }
  }
})