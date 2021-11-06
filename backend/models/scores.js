const { Scores } = require('../db/index')

const addScore = async (data) => {
  const score = new Scores({
    ...data,
  })
  return score.save()
}

const findScoreGroup = async (gameId, gte, lte) => {
  console.log(gte, lte);
  return Scores.aggregate([
    {
      $match: {
        gameId,
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

module.exports = {
  addScore,
  findScoreGroup,
}
