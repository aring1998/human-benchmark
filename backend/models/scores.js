const { Scores } = require('../db/index')

const addScore = async (data) => {
  const score = new Scores({
    ...data,
    created: Date.now()
  })
  return score.save()
}

const findScoreGroup = async (gameId, userId, gte, lte) => {
  return Scores.aggregate([
    {
      $match: {
        gameId,
        userId: userId ? userId : /^/,
        score: { $gte: gte, $lte: lte },
      },
    },
    {
      $group: {
        _id: '$score',
        count: { $sum: 1 },
      },
    },
  ]).sort({ _id: 1 })
}

const findBestScore = async (userId, gameId, gte, lte) => {
  return Scores.aggregate([
    {
      $match: {
        gameId,
        userId: userId,
        score: { $gte: gte, $lte: lte },
      },
    },
    {
      $group: {
        _id: null,
        minScore: { $min: '$score' },
        maxScore: { $max: '$score' }
      },
    }
  ])
}

const findScore = (data) => {
  return Scores.find({ ...data }).sort({ score: data.sort })
}

module.exports = {
  addScore,
  findScoreGroup,
  findBestScore,
  findScore
}
