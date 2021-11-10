const mongoose = require('mongoose')

// 构建users的model
const usersSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true // 唯一值
  },
  password: String,
  email: String,
  token: String,
  created: Number,
  updated: {
    type: Number,
    default: Date.now()
  },
  vCode: String
})

const Users = mongoose.model('users', usersSchema)
module.exports = Users