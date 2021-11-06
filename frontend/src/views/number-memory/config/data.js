import { newArray } from '@/utils/index'

export const chartOptions = {
  xAxis: {
    type: 'category',
    data: newArray(3, 25)
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
  '该测试是对于数字敏感度的考验。',
  '一般人只能准确地记住7个数字，但是使用助记软件能做到更好。'
]