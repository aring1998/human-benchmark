const { Notices } = require('../db/index')

const findNotices = async () => {
  const notices = await Notices.find({ delFlag: 0 }).sort({ created: -1 })
  const data = []
  notices.forEach((item) => {
    if (item.created + item.showDays * 1000 * 60 * 60 * 24 > Date.now()) {
      data.push(item)
    }
  })
  return data
}

const addNotice = (data) => {
  const notice = new Notices({ ...data })
  return notice.save()
}

// 直接添加
const addRightNow = async () => {
  await addNotice({
    title: '前端交流群',
    content: [
      {
        text: '虽是前端交流群，但欢迎任何计算机相关或者正往计算机行业发展的人士。',
      },
    ],
    mainImg: 'https://source.aring.cc/upload/vqrcode.jpg',
    imgList: ['https://source.aring.cc/upload/vqrcode.jpg'],
    showDays: 7,
    created: Date.now(),
    updated: Date.now(),
    delFlag: 0,
  })
}
// addRightNow()

module.exports = {
  findNotices,
}
