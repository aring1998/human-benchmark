const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
  text: String
})

const Articles = mongoose.model('articles', articlesSchema)
module.exports = Articles