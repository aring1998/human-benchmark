const mongoose = require('mongoose')

const wordsSchema = mongoose.Schema({
  word: String,
})

const Words = mongoose.model('words', wordsSchema)
module.exports = Words
