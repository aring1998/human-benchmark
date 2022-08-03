const { suc } = require('../utils/render')
const noticesModal = require('../models/notices')

/**
 * 获取有效公告
 */
const getNotices = async (_, res) => {
  const data = await noticesModal.findNotices()
  if (data) suc(res, data, '')
}

module.exports = {
  getNotices,
}
