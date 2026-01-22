const { Scores } = require('../db/index')

const addScore = async (data) => {
  const score = new Scores({
    ...data,
    created: Date.now()
  })
  return score.save()
}
const updateScoreUserId = async (data) => {
  const { tempUserId, userId } = data
  if (tempUserId.length !== 16) return
  return Scores.updateMany({ userId: tempUserId }, { userId: userId })
}
const findScoreGroup = async (gameId, userId, gte, lte, section) => {
  const match = {
    gameId: gameId,
    score: {
      $gte: gte !== undefined ? Number(gte) : 0,
      $lte: lte !== undefined ? Number(lte) : 999
    }
  }

  // 只有传了 userId 才匹配，否则不限制
  if (userId) {
    match.userId = userId
  }

  return Scores.aggregate([
    { $match: match },
    {
      $group: {
        _id: {
          $floor: {
            $divide: ['$score', section ? Number(section) : 1]
          }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } } // 在 group 后排序
  ])
}

const findBestScore = async (userId, gameId, gte, lte) => {
  return Scores.aggregate([
    {
      $match: {
        gameId,
        userId: userId,
        score: { $gte: gte ? Number(gte) : 0, $lte: lte ? Number(lte) : 999 }
      }
    },
    {
      $group: {
        _id: null,
        minScore: { $min: '$score' },
        maxScore: { $max: '$score' }
      }
    }
  ])
}
const findBestScoreIndex = async (gameId, gte, lte, best, targetScore) => {
  // 校验参数
  // if (typeof targetScore !== 'number' && isNaN(Number(targetScore))) {
  //   throw new Error('targetScore must be a valid number')
  // }
  targetScore = Number(targetScore)

  // 构建基础 match 条件
  const matchBase = {
    gameId: gameId,
    score: {}
  }

  // 添加分数区间
  if (gte !== undefined && gte !== null) {
    matchBase.score.$gte = Number(gte)
  }
  if (lte !== undefined && lte !== null) {
    matchBase.score.$lte = Number(lte)
  } else {
    matchBase.score.$lte = 999 // 默认上限
  }

  // 升序：越小越好；降序：越大越好
  const isAsc = best === 1

  // 构建“比目标分数更优”的查询条件
  let betterMatch = { ...matchBase }
  if (isAsc) {
    // 升序：比 targetScore 小的记录数
    betterMatch.score.$lt = targetScore
  } else {
    // 降序：比 targetScore 大的记录数
    betterMatch.score.$gt = targetScore
  }

  // 查询：比目标分数更优的数量
  const [result] = await Scores.aggregate([{ $match: betterMatch }, { $count: 'betterCount' }])

  const betterCount = result?.betterCount || 0

  // 排名 = 更优的数量 + 1
  const rank = betterCount + 1

  return { score: targetScore, index: rank }
}

const findScoreCount = (gameId, gte, lte) => {
  return Scores.aggregate([
    {
      $match: {
        gameId,
        score: { $gte: gte ? Number(gte) : 0, $lte: lte ? Number(lte) : 999 }
      }
    },
    {
      $count: 'total'
    }
  ])
}

module.exports = {
  addScore,
  updateScoreUserId,
  findScoreGroup,
  findBestScore,
  findBestScoreIndex,
  findScoreCount
}
