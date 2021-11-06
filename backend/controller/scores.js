const scoresModel = require('../models/scores')
const usersModel = require('../models/users')
const { suc, fail } = require('../utils/render')

/**
 * 保存分数
 */
 const saveScore = async (req, res, next) => {
  const { gameId, score, } = req.body
  const token = req.headers.authorization
  const userInfo = await usersModel.findUser(token)
  // if (!userInfo) return fail(res, '请先登录才可以保存分数哦')

  const data = await scoresModel.addScore({
    userId: userInfo ? userInfo._id : 0,
    gameId,
    score
  })

  suc(res, data, '保存成功')
}

/**
 * 找到对应游戏分数统计数据
 */
const getChartData = async (req, res, next) => {
  const { gameId, lte, gte } = req.query
  console.log(req.query);
  const data = await scoresModel.findScoreGroup(+gameId, gte ? +gte : 0, lte ? +lte : 999)
  suc(res, data, '')
}

module.exports = {
  saveScore,
  getChartData
}