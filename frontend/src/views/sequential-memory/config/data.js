export const aboutText = [
  '该测试考验您对序列的短期记忆能力',
  '在每个关卡中，方块会按照顺序闪烁。结束闪烁后，您需要按照刚刚方块出现的顺序逐个点击方块。',
  '测试将会越来越难，如果您点击了错误的方块，则测试结束。'
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
