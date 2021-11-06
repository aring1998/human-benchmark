import { newArray } from "@/utils"

export const chartOptions = {
  xAxis: {
    type: 'category',
    data: newArray(100, 500)
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
  '这是对每分钟打字速度的简单测试。',
  '本测试的测量方法为(您输入的正确字符 / 目前消耗的时间)'
]
