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
  '该测试是对于视觉敏感度的考验。',
  '每个级别中，一些方块会闪烁白色。记住它们，并在方块重置后点击它们！',
  '测试将会越来越难。',
  '如果您在一个关卡中错误的点击三个方块，您将会失去一条生命',
  '您有三条生命，尽可能做到最好吧！'
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
