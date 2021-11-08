export const aboutText = [
  '每个级别中，方块会按照顺序闪烁。',
  '结束闪烁后，您需要按照刚刚方块出现的顺序逐个点击方块',
  '如果您点错了，则测试结束。'
]

export const choiceCellIndex = (level) => {
  if (level <= 5) {
    return 1
  }
  else if (level > 5 && level <= 12) {
    return 2
  }
  else if (level > 12 && level <= 20) {
    return 3
  }
  else if (level > 20) {
    return 4
  }
}
