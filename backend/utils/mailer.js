// 引入模块
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

// 设置邮箱配置
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com', // 邮箱服务的主机，如smtp.qq.com
  port: '', // 对应的端口号
  // 开启安全连接
  secure: false,
  // 用户信息
  auth: {
    user: '1303340995@qq.com',
    pass: process.env.MAIL_AUTH_CODE,
  },
})

module.exports = {
  transporter
}