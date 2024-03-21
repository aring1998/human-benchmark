export const aboutText = [
  '这是一款寓教于乐的测试，旨在通过一系列数学题目，考验您的逻辑思维及快速反应能力。',
  '在该测试中，您将面对加减乘除四项基础计算，每个题目都需要您尽快完成正确的答题。当您正确回答问题时会得到一分，而错误的回答则会扣除一分。',
  '您有60秒的时间作答，尽可能做到最好吧！',
]

const calcRuleRate = [
  {
    symbol: '+',
    rate: 35,
    range1: {
      firstNum: [10, 90],
      secondNum: [1, 10],
    },
    range2: {
      firstNum: [10, 100],
      secondNum: [10, 100],
    },
    range3: {
      firstNum: [100, 1000],
      secondNum: [10, 100],
    },
    range4: {
      firstNum: [100, 1000],
      secondNum: [10, 500],
    },
    range5: {
      firstNum: [100, 1000],
      secondNum: [100, 1000],
    },
  },
  {
    symbol: '-',
    rate: 30,
    range1: {
      firstNum: [10, 90],
      secondNum: [1, 10],
    },
    range2: {
      firstNum: [10, 100],
      secondNum: [10, 100],
    },
    range3: {
      firstNum: [100, 1000],
      secondNum: [10, 50],
    },
    range4: {
      firstNum: [100, 1000],
      secondNum: [10, 200],
    },
    range5: {
      firstNum: [100, 1000],
      secondNum: [100, 500],
    },
  },
  {
    symbol: '*',
    rate: 20,
    range1: {
      firstNum: [2, 10],
      secondNum: [2, 10],
    },
    range2: {
      firstNum: [10, 100],
      secondNum: [2, 10],
    },
    range3: {
      firstNum: [50, 300],
      secondNum: [2, 10],
    },
    range4: {
      firstNum: [10, 300],
      secondNum: [10, 20],
    },
    range5: {
      firstNum: [10, 100],
      secondNum: [10, 100],
    },
  },
  {
    symbol: '/',
    rate: 15,
    range1: {
      firstNum: [4, 10],
      secondNum: [2, 5],
    },
    range2: {
      firstNum: [10, 100],
      secondNum: [2, 10],
    },
    range3: {
      firstNum: [50, 300],
      secondNum: [2, 10],
    },
    range4: {
      firstNum: [10, 300],
      secondNum: [10, 20],
    },
    range5: {
      firstNum: [10, 2000],
      secondNum: [10, 100],
    },
  },
]
export function getRandomCalc() {
  const rateList = calcRuleRate.map((item) => item.rate)
  let totalRate = 0
  const sumRateList = []
  rateList.forEach((item) => {
    totalRate += item
    sumRateList.push(totalRate)
  })
  const randomRate = Math.random() * 100
  const index = sumRateList.findIndex((rate) => randomRate <= rate)
  return calcRuleRate[index]
}

export function getLevel(score) {
  if (score <= 5) return 1
  else if (score > 5 && score <= 8) return 2
  else if (score > 9 && score <= 12) return 3
  else if (score > 13 && score <= 16) return 4
  else if (score > 16) return 5
}
