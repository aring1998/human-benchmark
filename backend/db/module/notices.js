const mongoose = require('mongoose')

const noticesSchema = mongoose.Schema({
  title: String,
  content: Array,
  mainImg: String,
  imgList: Array,
  created: Number,
  updated: Number,
  showDays: Number,
  delFlag: Number,
})

const Notices = mongoose.model('notices', noticesSchema)
module.exports = Notices
