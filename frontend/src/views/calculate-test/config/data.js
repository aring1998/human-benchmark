export const aboutText = [
  '这是一款寓教于乐的测试，旨在通过一系列数学题目，考验您的逻辑思维及快速反应能力。',
  '在该测试中，您将面对加减乘除四项基础计算，每个题目都需要您尽快完成正确的答题。当您正确回答问题时会得到一分，而错误的回答则会扣除一分。',
  '您有60秒的时间作答，尽可能做到最好吧！',
]

const calcRuleRate = [
  {
    symbol: '+',
    rate: 35,
  },
  {
    symbol: '-',
    rate: 30,
  },
  {
    symbol: '*',
    rate: 20,
  },
  {
    symbol: '/',
    rate: 15,
  },
]
export function getRandomCalcSymbol() {
  const rateList = calcRuleRate.map((item) => item.rate)
  let totalRate = 0
  const sumRateList = []
  rateList.forEach((item) => {
    totalRate += item
    sumRateList.push(totalRate)
  })
  const randomRate = Math.random() * 100
  const index = sumRateList.findIndex((rate) => randomRate < rate)
  return calcRuleRate[index].symbol
}
