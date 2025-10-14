const scoresModel = require('../models/scores')
const usersModel = require('../models/users')
const { suc, fail } = require('../utils/render')

/**
 * 保存分数
 */
const saveScore = async (req, res) => {
  const { gameId, score } = req.body
  const token = req.headers.authorization
  const userInfo = await usersModel.findUser({ token })

  const data = await scoresModel.addScore({
    userId: userInfo ? userInfo._id : 0,
    gameId,
    score,
  })

  suc(res, data, '保存成功')
}

/**
 * 找到对应游戏分数统计数据
 */
const getChartData = async (req, res) => {
  const { gameId, userId, lte, gte, section } = req.query
  const groupData = await scoresModel.findScoreGroup(Number(gameId), userId, gte, lte, section)
  const data = groupData.map((item) => ({
    ...item,
    _id: item._id * (section ? Number(section) : 1),
  }))
  suc(res, data, '')
}

/**
 * 获取用户的最优分数
 */
const getBestScore = async (req, res) => {
  const token = req.headers.authorization
  const userInfo = await usersModel.findUser({ token })
  if (!userInfo) return fail(res, '您需要先登录')

  const { gameList, gameId, gte, lte, best } = req.body

  // 如果是仪表盘详情页
  if (gameId) {
    const scores = await getBestScoreByGameId(userInfo._id.toString(), +gameId, gte, lte, best)
    return suc(res, scores, '')
  }

  // 查询所有游戏最优成绩
  const data = await Promise.all(
    gameList.map((item) => getBestScoreByGameId(userInfo._id.toString(), item.id, item.scoreRange[0], item.scoreRange[1], item.best))
  )
  suc(res, data, '')
}

/**
 * 获取用户对应游戏最优分数
 */
const getBestScoreByGameId = async (userId, gameId, gte, lte, best) => {
  const scores = await scoresModel.findBestScore(userId, gameId, gte, lte)
  scores.length > 0 ? (scores[0].gameId = gameId) : scores.push({ gameId }) // 补充其游戏id
  // 获取最佳分数
  const bestScore = best === 1 ? scores[0].minScore : scores[0].maxScore
  if (bestScore) scores[0].bestScore = bestScore
  // 获取该用户分数的百分位
  const bestScoreItem = await scoresModel.findBestScoreIndex(gameId, gte, lte, best, bestScore)
  const scoreCount = await scoresModel.findScoreCount(gameId, gte, lte)
  if (bestScoreItem.score) {
    const total = scoreCount[0].total
    const index = bestScoreItem.index
    const percentile = ((total - index) / total) * 100
    scores[0].percentile = Number(percentile.toFixed(1))
  }
  return scores[0]
}

module.exports = {
  saveScore,
  getChartData,
  getBestScore,
}
