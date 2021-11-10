const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/human-benchmark', {  // 本地环境
mongoose.connect('mongodb://81.68.189.158:26918/human-benchmark', {  // 正式环境
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

const Users = require('./module/users')
const Scores = require('./module/scores')

module.exports = {
  Users,
  Scores
}