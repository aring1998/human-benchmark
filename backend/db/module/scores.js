const mongoose = require('mongoose')

const scoresSchema = mongoose.Schema({
  userId: String,
  gameId: Number,
  score: Number,
  updated: {
    type: Number,
    default: Date.now()
  }
})

const Scores = mongoose.model('scores', scoresSchema)
module.exports = Scores