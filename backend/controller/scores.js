const scoresModel = require('../models/scores')
const usersModel = require('../models/users')
const { suc, fail } = require('../utils/render')

const normalizeGameConfig = (item) => ({
  gameId: Number(item.gameId || item.id),
  gte: item.gte,
  lte: item.lte,
  best: Number(item.best)
})

const attachPercentile = (scoreItem, percentileStats) => {
  if (!percentileStats || !percentileStats.total) return scoreItem

  const percentile = ((percentileStats.total - percentileStats.betterCount - 1) / percentileStats.total) * 100
  scoreItem.percentile = Number(percentile.toFixed(1))
  return scoreItem
}

const getBestScores = async (userId, gameList) => {
  const scoreMap = new Map()
  const bestScores = await scoresModel.findBestScoresByGames(userId, gameList)

  bestScores.forEach((item) => {
    scoreMap.set(item._id, item)
  })

  const result = gameList.map((item) => {
    const scoreItem = scoreMap.get(item.gameId)
    const current = scoreItem ? { ...scoreItem, gameId: item.gameId } : { gameId: item.gameId }
    const bestScore = item.best === 1 ? current.minScore : current.maxScore

    if (bestScore !== undefined && bestScore !== null) {
      current.bestScore = bestScore
    }

    return current
  })

  const percentileGameList = result
    .map((item, index) => ({
      ...gameList[index],
      bestScore: item.bestScore,
      result: item
    }))
    .filter((item) => item.bestScore !== undefined && item.bestScore !== null)

  const needPercentileList = percentileGameList.filter((item) => {
    const lteNumber = item.lte !== undefined && item.lte !== null ? Number(item.lte) : null
    if (lteNumber !== null && item.bestScore > lteNumber) {
      item.result.percentile = 100
      return false
    }
    return true
  })

  const percentileStats = await scoresModel.findPercentileStatsByGames(needPercentileList)

  needPercentileList.forEach((item) => {
    const stats = percentileStats.get(item.gameId)
    attachPercentile(item.result, stats)
  })

  return result
}

/**
 * 保存分数
 */
const saveScore = async (req, res) => {
  const { gameId, score, tempUserId } = req.body
  const token = req.headers.authorization
  const userInfo = tempUserId || !token ? null : await usersModel.findUser({ token })

  const data = await scoresModel.addScore({
    userId: tempUserId || (userInfo ? userInfo._id : 0),
    gameId,
    score
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
    _id: item._id * (section ? Number(section) : 1)
  }))
  suc(res, data, '')
}

/**
 * 获取用户的最优分数
 */
const getBestScore = async (req, res) => {
  const token = req.headers.authorization
  const { gameList, gameId, gte, lte, best, tempUserId } = req.body

  const userInfo = tempUserId || !token ? null : await usersModel.findUser({ token })
  if (!userInfo && !tempUserId) return fail(res, '您需要先登录')

  const userId = tempUserId || userInfo._id.toString()

  // 如果是仪表盘详情页
  if (gameId) {
    const [score] = await getBestScores(userId, [normalizeGameConfig({ gameId, gte, lte, best })])
    return suc(res, score, '')
  }

  // 查询所有游戏最优成绩
  const data = await getBestScores(
    userId,
    gameList.map((item) =>
      normalizeGameConfig({
        gameId: item.id,
        gte: item.scoreRange[0],
        lte: item.scoreRange[1],
        best: item.best
      })
    )
  )
  suc(res, data, '')
}

module.exports = {
  saveScore,
  getChartData,
  getBestScore
}
