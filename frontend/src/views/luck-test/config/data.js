export const aboutText = [
  '这是一个纯娱乐性质的测试。',
  '每回合您将从5张卡牌中抽出一张，在5次抽取后我们将计算您抽中优质卡牌的比重。',
  '概率公示：普通(35%)，精良(25%)，稀有(20%)，史诗(15%)，传说(5%)。'
]

export const cardOptions = [
  {
    name: '普通',
    color: '#989898',
    score: 2
  },
  {
    name: '精良',
    color: '#66CC66',
    score: 4
  },
  {
    name: '稀有',
    color: '#0066FF',
    score: 6
  },
  {
    name: '史诗',
    color: '#9933FF',
    score: 8
  },
  {
    name: '传说',
    color: '#FFCC00',
    score: 10
  }
]

// 抽卡概率
export const cardProbability = (value) => {
  if (value <= 3.5) return 0  // 普通 35%
  if (value > 3.5 && value <= 6) return 1 // 精良 25%
  if (value > 6 && value <= 8) return 2  // 稀有 20%
  if (value > 8 && value <= 9.5) return 3  // 史诗 15%
  if (value > 9.5) return 4  // 传说 5%
}

// 抽卡列表转字符串
export const cardListStr = (arr) => {
  let common = 0, excellent = 0, rare = 0, epic = 0, legend = 0
  const computedCard = {
    0: () => { common++ },
    1: () => { excellent++ },
    2: () => { rare++ },
    3: () => { epic++ },
    4: () => { legend++ }
  }
  arr.forEach(value => {
    computedCard[value]()
  })
  return `
    <span>
      本次测试您获得了
      ${common ? `，${common}张<span style="color: #989898">普通</span>卡牌` : ''}
      ${excellent ? `，${excellent}张<span style="color: #66CC66">精良</span>卡牌` : ''}
      ${rare ? `，${rare}张<span style="color: #0066FF">稀有</span>卡牌` : ''}
      ${epic ? `，${epic}张<span style="color: #9933FF">史诗</span>卡牌` : ''}
      ${legend ? `，${legend}张<span style="color: #FFCC00">传说</span>卡牌。` : '。'}
    </span>
  `
}