const { suc, fail } = require('../utils/render')
const articlesModal = require('../models/articles')

/**
 * 随机获取一篇文章
 */
const randomArticle = async (req, res, next) => {
  const data = await articlesModal.randomFind()
  if (data) suc(res, data[0], '')
}

module.exports = {
  randomArticle
}