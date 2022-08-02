const { suc } = require('../utils/render')
const wordsModel = require('../models/words')

/**
 * 随机获取单词组
 */
const randomWords = async (req, res) => {
  const { size = 200 } = req
  const list = await wordsModel.randomFind(size)
  const data = list.map(item => item.word)
  suc(res, data, '')
}

module.exports = {
  randomWords
}