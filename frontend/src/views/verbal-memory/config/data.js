export const aboutText = [
  '该测试考验您一次可以在短期记忆中保留多少单词。',
  '您需要记住的单词数量将会不断增加，直到您再也无法将它们记在脑海中。',
  '您的分数取决于您正确回答了多少次。',
  '您有三次失误机会，尽可能做到最好吧！'
]

export const vocabulary = [
  '冰冷', '手心', '用功', '清早', '礼堂', '来自', '会议', '报到', '屋子', '这儿',
  '机器', '晚上', '连队', '下巴', '前门', '绿豆', '仔鸡', '中午', '黄豆', '睡衣',
  '洗澡', '总是', '道贺', '休养', '光亮', '是非', '生动', '火力', '向往', '直接',
  '爱好', '红灯', '对手', '相连', '追赶', '活口', '总理', '童趣', '拖拉', '苗木',
  '再次', '同义', '作文', '向上', '嘴角', '这次', '关心', '刚刚', '鲜花', '蜜蜂',
  '练字',' 瓜皮',' 竹席',' 学校',' 幕后',' 打工',' 声乐',' 原来',' 梦乡',' 不快',
  '帮忙',' 搭车',' 办事', '出入', '藏书', '太后', '每次', '海水', '习惯', '蚜虫',
  '手边', '电机', '旁边', '公主', '爸爸', '雨点', '因为', '告吹', '奶妈', '烟雾',
  '日用', '教父', '刻苦', '远近', '难题', '干草', '规定', '早饭', '月牙', '球队'
]

export const vocabularyRange = (score) => {
  score = (Math.floor(score / 10) + 1) * 10
  if (score > 80) return 89 // 防溢出
  return score
}
