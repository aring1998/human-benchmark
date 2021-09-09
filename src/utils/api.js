import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
// const qs = require('qs')

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://47.103.218.109:10052/api/', 
  timeout: 30000,
  validateStatus: status => {
    // 允许返回所有状态码，不会遇到错误就停止
    return status >= 200 && status <= 600
  }
})

// 请求拦截
instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.state.token}`
  return config
}), err => {
  console.log(err);
}
// 响应拦截
instance.interceptors.response.use(res => {
  if (res.status !== 200) Message.error(`网络请求错误，错误：${res.statusText}`)
  if (res.data.code !== 0) Message.error(res.data.msg)
  return res.data  // 配置只返回data
}), err => {
  console.log(err);
}

// 封装get/post方法
export const api = {
  async get(url, data) {
    try {
      let res = await instance.get(url, { params: data })
      return new Promise(resolve => {
        if (res.code === 0) {
          resolve(res)
        } else {
          resolve(res)
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  async post(url, data) {
    try {
      let res = await instance.post(url, data)
      return new Promise((resolve, reject) => {
        if (res.code === 0) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
}
