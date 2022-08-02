export const aboutText = [
  '该测试考验您一次可以在短期记忆中保留多少单词。',
  '您需要记住的单词数量将会不断增加，直到您再也无法将它们记在脑海中。',
  '您的分数取决于您正确回答了多少次。',
  '您有三次失误机会，尽可能做到最好吧！'
]

export const vocabularyRange = (score) => {
  score = (Math.floor(score / 10) + 1) * 10
  if (score > 200) return 199 // 防溢出
  return score
}
