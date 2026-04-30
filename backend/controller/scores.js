const scoresModel = require('../models/scores')
const usersModel = require('../models/users')
const { suc, fail } = require('../utils/render')

const normalizeGameConfig = (item) => ({
  gameId: Number(item.gameId || item.id),
  gte: item.gte,
  lte: item.lte,
  best: Number(item.best)
})

const calculatePercentile = (total, betterCount, includeCurrent) => {
  if (!total) return 0

  const offset = includeCurrent ? 1 : 0
  const percentile = ((total - betterCount - offset) / total) * 100

  return Number(Math.min(100, Math.max(0, percentile)).toFixed(1))
}

const resolveBoundaryPercentile = ({ score, gte, lte, best }) => {
  const scoreNumber = Number(score)
  const gteNumber = gte !== undefined && gte !== null && gte !== '' ? Number(gte) : null
  const lteNumber = lte !== undefined && lte !== null && lte !== '' ? Number(lte) : null

  if (best === 1) {
    if (gteNumber !== null && scoreNumber < gteNumber) return 100
    if (lteNumber !== null && scoreNumber > lteNumber) return 0
  } else {
    if (gteNumber !== null && scoreNumber < gteNumber) return 0
    if (lteNumber !== null && scoreNumber > lteNumber) return 100
  }

  return null
}

const attachPercentile = (scoreItem, percentileStats) => {
  if (!percentileStats || !percentileStats.total) return scoreItem

  scoreItem.percentile = calculatePercentile(percentileStats.total, percentileStats.betterCount, true)
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
    const boundaryPercentile = resolveBoundaryPercentile({
      score: item.bestScore,
      gte: item.gte,
      lte: item.lte,
      best: item.best
    })

    if (boundaryPercentile !== null) {
      item.result.percentile = boundaryPercentile
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

/**
 * 通过分数获取排名百分位
 */
const getScorePercentile = async (req, res) => {
  const { gameId, gte, lte, best, score } = req.query

  if (gameId === undefined || best === undefined || score === undefined || score === '') {
    return fail(res, '缺少必要参数')
  }

  const scoreNumber = Number(score)
  const gameConfig = normalizeGameConfig({ gameId, gte, lte, best })

  if (Number.isNaN(gameConfig.gameId) || Number.isNaN(gameConfig.best) || Number.isNaN(scoreNumber)) {
    return fail(res, '参数格式错误')
  }

  const boundaryPercentile = resolveBoundaryPercentile({
    score: scoreNumber,
    gte: gameConfig.gte,
    lte: gameConfig.lte,
    best: gameConfig.best
  })

  if (boundaryPercentile !== null) {
    return suc(res, { percentile: boundaryPercentile }, '')
  }

  const [[countResult], rankInfo] = await Promise.all([
    scoresModel.findScoreCount(gameConfig.gameId, gameConfig.gte, gameConfig.lte),
    scoresModel.findBestScoreIndex(gameConfig.gameId, gameConfig.gte, gameConfig.lte, gameConfig.best, scoreNumber)
  ])

  const total = countResult ? countResult.total : 0
  const betterCount = rankInfo.index - 1

  suc(res, { percentile: calculatePercentile(total, betterCount, false) }, '')
}

module.exports = {
  saveScore,
  getChartData,
  getBestScore,
  getScorePercentile
}
