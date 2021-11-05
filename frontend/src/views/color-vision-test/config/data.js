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
  '该测试是对于颜色敏感度的考验。',
  '每个级别中，都会有一个方块与其他的方块不同，尝试找到并点击它！',
  '测试将会越来越难。',
  '如果您点击了错误的方块，则游戏结束。'
]

export const choiceCellIndex = (level) => {
  if (level <= 3) {
    return 0
  }
  else if (level > 3 && level <= 7) {
    return 1
  }
  else if (level > 7 && level <= 12) {
    return 2
  }
  else if (level > 12 && level <= 18) {
    return 3
  }
  else if (level > 18 && level <= 24) {
    return 4
  }
  else if (level > 24) {
    return 5
  }
}

// 选择色差值
export const choiceChangeValue = (level) => {
  if (level <= 3) {
    return 40
  }
  else if (level > 3 && level <= 7) {
    return 30
  }
  else if (level > 7 && level <= 12) {
    return 25
  }
  else if (level > 12 && level <= 18) {
    return 20
  }
  else if (level > 18 && level <= 21) {
    return 18
  }
  else if (level > 21 && level <= 30) {
    return 16
  }
  else if (level > 30 && level <= 40) {
    return 14
  }
  else if (level > 40 && level <= 50) {
    return 12
  }
  else if (level > 50) {
    return 10
  }
}
