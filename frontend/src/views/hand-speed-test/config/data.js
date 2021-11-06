import { newArray } from "@/utils"

export const chartOptions = {
  xAxis: {
    type: 'category',
    data: newArray(30, 200)
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
  '这是一个测试手速的简单工具。',
  '相对于打字测试更加便捷高效，您只需伸出手指或点击鼠标就能完成测试。',
  '尽可能做得更好吧！'
]
