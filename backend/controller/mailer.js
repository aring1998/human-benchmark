const fs = require('fs')
const path = require('path')
const { suc, fail } = require('../utils/render')
const { transporter } = require('../utils/mailer')
const usersModel = require('../models/users')

/**
 * 意见反馈
 */
const feedback = async (req, res, next) => {
  const mailTemp = fs.readFileSync(path.join(__dirname, "..", "assets", 'opnion.html'), 'utf-8')
  const { qq, opinion } = req.body
  const html = mailTemp.replace('$qq', qq || '匿名').replace('$opnion', opinion)
  const mailOptions = {
    from: 'aring<1303340995@qq.com>', // 谁发的
    to: 'aring<1303340995@qq.com>', // 发给谁
    subject: '《人类基准测试》您有新的意见反馈', // 主题是什么
    text: '', // 文本内容
    html // html模板
  }
  transporter.sendMail(mailOptions, err => {
    if (err) return fail(res, '提交失败')
    suc(res, {}, '提交成功')
  })
}

/**
 * 重置密码邮件
 */
const resetMail = async (req, res, next) => {
  const mailTemp = fs.readFileSync(path.join(__dirname, "..", "assets", 'reset.html'), 'utf-8')
  const { email } = req.body
  const reg = new RegExp(`${email}`, 'i')
  const userInfo = await usersModel.findUser({ email: reg })
  if (!userInfo) return fail(res, '不存在该邮箱对应的用户')
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10)
  }
  const html = mailTemp.replace('$code', code)
  const mailOptions = {
    from: 'aring<1303340995@qq.com>', // 谁发的
    to: `<${email}>`, // 发给谁
    subject: '《人类基准测试》您的重置验证码', // 主题是什么
    text: '', // 文本内容
    html // html模板
  }
  transporter.sendMail(mailOptions, async err => {
    if (err) return fail(res, '发送失败')
    await usersModel.updateUser({}, { vCode: code })
    setTimeout(() => {
      usersModel.updateUser({}, { vCode: '' })
    }, 30000);
    suc(res, {}, '发送成功')
  })
}

module.exports = {
  feedback,
  resetMail
}