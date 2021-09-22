export const chartOptions = {
  xAxis: {
    type: 'category',
    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ]
}

export const aboutText = [
  '该测试考验您一次可以在短期记忆中保留多少单词。',
  '您需要记住的单词数量将会不断增加，直到您再也无法将它们记在脑海中。',
  '您的分数取决于您正确回答了多少次。',
  '您有三次失误机会，尽可能做到最好吧！'
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
  if (value <= 4) return 0  // 普通 40%
  if (value > 4 && value <= 7) return 2  // 精良 30%
  if (value > 7 && value <= 9) return 3  // 史诗 20%
  if (value === 10) return 4  // 传说 10%
}

// 抽卡列表转字符串
export const cardListStr = (arr) => {
  let common = 0, excellent = 0, rare = 0, epic = 0, legend = 0
  arr.forEach(value => {
    if (value === 0) common++
    if (value === 1) excellent++
    if (value === 2) rare++
    if (value === 3) epic++
    if (value === 4) legend++
  })
  return `
    <span>
      本次测试您获得了，
      ${common ? `${common}张<span style="color: #989898">普通</span>卡牌` : ''}
      ${excellent ? `，${excellent}张<span style="color: #66CC66">精良</span>卡牌，` : ''}
      ${rare ? `，${rare}张<span style="color: #0066FF">稀有</span>卡牌` : ''}
      ${epic ? `，${epic}张<span style="color: #9933FF">史诗</span>卡牌` : ''}
      ${legend ? `，${legend}张<span style="color: #FFCC00">传说</span>卡牌。` : '。'}
    </span>
  `
}