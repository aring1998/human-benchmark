export const aboutText = [
  '该测试考验您一次可以在短期记忆中保留多少单词。',
  '当每次单词出现时，您需要判断当前单词是否出现过，如该单词之前出现过，则点击"见过"，反之点击"新的"。您需要记住的单词数量将会不断增加，直到您再也无法将它们记住。',
  '您的分数取决于您正确回答了多少次。三次失误后则游戏结束，尽可能做到最好吧！'
]

export const vocabularyRange = (score) => {
  score = (Math.floor(score / 10) + 1) * 10
  if (score > 200) return 199 // 防溢出
  return score
}
