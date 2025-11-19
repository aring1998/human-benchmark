export const aboutText = [
  '这是一个考验动态视力的测试。',
  '您需要快速分析出移动小球的数量，并提交正确答案。',
  '随着测试等级的增加，将提高小球的移动速度，并增加小球的数量。',
  '请集中注意力，祝您测试顺利！'
]

export function getLevelballCount(level) {
  if (level <= 3) {
    return [5, 9]
  } else if (level > 3 && level < 7) {
    return [6, 10]
  } else if (level >= 7 && level < 10) {
    return [6, 11]
  } else if (level >= 10 && level < 15) {
    return [7, 12]
  } else if (level >= 15 && level < 20) {
    return [8, 13]
  } else {
    return [10, 15]
  }
}
