import { newArray} from "@/utils/index"

export const chartOptions = {
  xAxis: {
    type: 'category',
    data: newArray(0, 530)
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
  '这是一个测试反应时间的简单工具。',
  '除了测试您的反应时间以外，此测试还受计算机和显示器延迟的影响，使用快速的计算机和低延迟/高帧率的显示器能有效提高您的分数。',
  '虽然人类的平均反应时间可能介于 200-250 毫秒之间，但您的计算机可能会增加 10-50 毫秒。一些现代电视增加了多达 150 毫秒！',
  '执行5次点击后，我们会将你的反应均值记录，您可以保存分数至服务器。'
]
