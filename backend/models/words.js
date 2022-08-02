const { Words } = require('../db/index')

const randomFind = (size) => {
  return Words.aggregate([{ $sample: { size } }])
}

const addWords = (data) => {
  return Words.insertMany(data)
}

// 直接通过在word中输入添加词语
const addRightNow = async () => {
  await addWords([{ word: '' }])
}
// addRightNow()

module.exports = {
  randomFind,
}
