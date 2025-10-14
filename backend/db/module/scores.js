const mongoose = require('mongoose')

const scoresSchema = mongoose.Schema({
  userId: String,
  gameId: Number,
  score: Number,
  created: Number,
  updated: {
    type: Number,
    default: Date.now(),
  },
})
// 👇 创建复合索引
scoresSchema.index({ gameId: 1 });
scoresSchema.index({ userId: 1 });
scoresSchema.index({ score: 1 });
scoresSchema.index({ gameId: 1, userId: 1, score: 1 });
scoresSchema.index({ gameId: 1, score: 1 });
const Scores = mongoose.model('scores', scoresSchema)

module.exports = Scores
