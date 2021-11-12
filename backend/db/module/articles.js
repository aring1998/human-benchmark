const mongoose = require('mongoose')

const aticlesSchema = mongoose.Schema({
  text: String
})

const Articles = mongoose.model('aticles', aticlesSchema)
module.exports = Articles