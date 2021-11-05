const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/human-benchmark', {
// mongoose.connect('mongodb://81.68.189.158/human-benchmark', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// 构建users的modal
const usersSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  token: String
})

const Users = mongoose.model('users', usersSchema)
exports.Users = Users