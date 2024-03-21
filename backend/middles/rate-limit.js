const rateLimit = require('express-rate-limit')

// 限制同一ip多次请求
function limitIpReqPerMin(max) {
  return rateLimit({
    max, // 允许的最大请求数
    windowMs: 60000, // 时间窗口的毫秒数
    message: '请求过多！',
  })
}

module.exports = {
  limitIpReqPerMin,
}
