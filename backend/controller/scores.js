const scoresModel = require('../models/scores')
const usersModel = require('../models/users')
const { suc, fail } = require('../utils/render')

/**
 * 保存分数
 */
 const saveScore = async (req, res, next) => {
  const { gameId, score, } = req.body
  const token = req.headers.authorization
  const userInfo = await usersModel.findUser({ token })
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
  const data = await scoresModel.findScoreGroup(+gameId, gte ? +gte : 0, lte ? +lte : 999)
  suc(res, data, '')
}

/**
 * 获取用户的最优分数
 */
const getBestScore = async (req, res, next) => {
  const token = req.headers.authorization
  const userInfo = await usersModel.findUser({ token })
  if (!userInfo) return fail(res, '您需要先登录')

  const { gameCount } = req.query

  const scoresArr = []
  for (let i = 1; i < +gameCount; i++) {
    const scores = await scoresModel.findBestScore(userInfo._id.toString(), i)
    scores.length > 0 ? scores[0].gameId = i : scores.push({ gameId: i })  // 补充其游戏id
    // 获取该用户分数的百分位
    const allScoresForMin = await scoresModel.findScore({ gameId: i, sort: 1 })
    const allScoresForMax = await scoresModel.findScore({ gameId: i, sort: -1 })
    let minIndex = ''
    let maxIndex = ''
    const minScore = scores ? scores[0].minScore : ''
    const maxScore = scores ? scores[0].maxScore : ''
    for (let j in allScoresForMin) {
      if (minScore === '' || minIndex !== '') break
      if (allScoresForMin[j].score == minScore) minIndex = j
    }
    for (let k in allScoresForMax) {
      if (maxScore === '' || maxIndex !== '') break
      if (allScoresForMax[k].score == maxScore) maxIndex = k
    }
    if (minScore && maxScore) {
      const minPercentile = 100 - 100 / allScoresForMin.length * minIndex
      const maxPercentile = 100 - 100 / allScoresForMax.length * maxIndex
      if (scores.length > 0) {
        scores[0].minPercentile = Number(minPercentile.toFixed(1))
        scores[0].maxPercentile = Number(maxPercentile.toFixed(1))
      }
    }

    scoresArr.push(...scores)
  }
  
  suc(res, scoresArr, '')
}

module.exports = {
  saveScore,
  getChartData,
  getBestScore
}