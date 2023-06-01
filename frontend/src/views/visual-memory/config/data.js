export const aboutText = [
  '该测试是对于视觉敏感度的考验。',
  '每个级别中，一些方块会闪烁白色。记住它们，并在方块重置后点击它们！',
  '如果您在一个关卡中点击错误的方块达到三次，将导致当前关卡重新开始，并使您失去一次机会。',
  '您共有三次机会，尝试做到最好吧！'
]

export const choiceCellIndex = (level) => {
  if (level <= 3) {
    return 1
  }
  else if (level > 3 && level <= 7) {
    return 2
  }
  else if (level > 7 && level <= 12) {
    return 3
  }
  else if (level > 12 && level <= 18) {
    return 4
  }
  else if (level > 18) {
    return 5
  }
}
