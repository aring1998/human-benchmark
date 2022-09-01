import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 10000,
  validateStatus: status => {
    // 允许返回所有状态码，不会遇到错误就停止
    return status >= 200 && status <= 600
  }
})

// 请求拦截
instance.interceptors.request.use(config => {
  store.state.loading = true
  config.headers.Authorization = `${store.state.userInfo.token}`
  return config
}), err => {
  console.log(err)
}
// 响应拦截
instance.interceptors.response.use(res => {
  store.state.loading = false
  if (res.status !== 200) return Message.error(`网络请求错误，错误：${res.statusText}`)
  if (res.data.code !== 0) Message.error(res.data.message)
  else {
    if (res.data.message) Message.success(res.data.message)
  }
  return res.data  // 配置只返回data
}), err => {
  console.log(err)
}

// 封装get/post方法
export const api = {
  async get(url, params) {
    try {
      let res = await instance.get(url, {params})
      return new Promise(resolve => {
        resolve(res)
      })
    } catch (err) {
      console.log(err)
    }
  },
  async post(url, data) {
    try {
      let res = await instance.post(url, data)
      return new Promise(resolve => {
        resolve(res)
      })
    } catch (err) {
      console.log(err)
    }
  }
}
