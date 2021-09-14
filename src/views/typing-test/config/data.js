export const chartOptions = {
  xAxis: {
    type: 'category',
    data: ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
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
  '这是对每分钟打字速度的简单测试。',
  '本测试的测量方法为(您输入的正确字符 / 目前消耗的时间)'
]
