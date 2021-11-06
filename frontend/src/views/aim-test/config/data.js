import { newArray } from "@/utils"

export const chartOptions = {
  xAxis: {
    type: 'category',
    data: newArray(100, 800)
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
  '该测试考验反应能力和手眼协调能力。',
  '请尽可能快速精确地点击目标。',
  '这个测试的分数相对于反应时间测试要慢，因为你必须做出反应然后点击随机出现的目标。'
]
