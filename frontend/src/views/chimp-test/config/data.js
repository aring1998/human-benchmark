import { newArray } from "@/utils"

export const chartOptions = {
  xAxis: {
    type: 'category',
    data: newArray(4, 30)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true
    }
  ]
}

export const aboutText = [
  '这是一项对工作记忆的测试，这项研究因发现黑猩猩在执行此测试时胜过人类而闻名。',
  '在这项研究中，有些黑猩猩能够在90%的时间内记住9位数。',
  '这个测试是黑猩猩测试的一个变体，测试从4位数开始，如果您通过一个级别，则数字会增加。如果您在同一级别连续三次失败，则游戏结束。'
]

export const gameData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]