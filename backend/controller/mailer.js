const { suc, fail } = require('../utils/render')
const { transporter } = require('../utils/mailer')
const fs = require('fs')
const path = require('path')

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

module.exports = {
  feedback
}