const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 5000,
    keepAlive: true,
  }
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

const Users = require('./module/users')
const Scores = require('./module/scores')
const Articles = require('./module/articles')
const Words = require('./module/words')
const Notices = require('./module/notices')

module.exports = {
  Users,
  Scores,
  Articles,
  Words,
  Notices,
}
