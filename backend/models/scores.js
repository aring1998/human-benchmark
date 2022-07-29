const { Scores } = require('../db/index')

const addScore = async (data) => {
  const score = new Scores({
    ...data,
    created: Date.now(),
  })
  return score.save()
}

const findScoreGroup = async (gameId, userId, gte, lte, section) => {
  return Scores.aggregate([
    {
      $match: {
        gameId,
        userId: userId ? userId : /^/,
        score: { $gte: gte ? Number(gte) : 0, $lte: lte ? Number(lte) : 999 },
      },
    },
    {
      $group: {
        _id: {
          $floor: {
            $divide: ['$score', section ? Number(section) : 1],
          },
        },
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
        score: { $gte: gte ? Number(gte) : 0, $lte: lte ? Number(lte) : 999 },
      },
    },
    {
      $group: {
        _id: null,
        minScore: { $min: '$score' },
        maxScore: { $max: '$score' },
      },
    },
  ])
}

const findBestScoreIndex = (gameId, gte, lte, best, score) => {
  return Scores.aggregate([
    {
      $match: {
        gameId,
        score: { $gte: gte ? Number(gte) : 0, $lte: lte ? Number(lte) : 999 },
      },
    },
    {
      $sort: {
        score: best,
      },
    },
    {
      $group: {
        _id: null,
        table: {
          $push: '$$ROOT',
        },
      },
    },
    {
      $unwind: {
        path: '$table',
        includeArrayIndex: 'index',
      },
    },
    {
      $project: {
        _id: 0,
        score: '$table.score',
        index: {
          $add: ['$index', 1],
        },
      },
    },
    {
      $match: { score },
    },
  ])
}

const findScoreCount = (gameId, gte, lte) => {
  return Scores.aggregate([
    {
      $match: {
        gameId,
        score: { $gte: gte ? Number(gte) : 0, $lte: lte ? Number(lte) : 999 },
      },
    },
    {
      $count: 'total',
    },
  ])
}

module.exports = {
  addScore,
  findScoreGroup,
  findBestScore,
  findBestScoreIndex,
  findScoreCount,
}
