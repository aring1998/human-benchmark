const { Articles } = require('../db/index')

const randomFind = () => {
  return Articles.aggregate([{ $sample: { size: 1 } }])
}

const addArticle = (data) => {
  const article = new Articles({ ...data })
  return article.save()
}

// 直接通过在text中输入添加文章
const addRightNow = () => {
  addArticle({text: ``})
}
// addRightNow()


module.exports = {
  randomFind
}