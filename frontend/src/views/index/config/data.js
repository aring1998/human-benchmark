// 在此写标准的路径可不用在路由中配置
import { iconName } from "@/assets/js/icon-name"
export const gameList = [
  {
    id: 1,
    icon: iconName.reactionTime,
    title: '反应时间',
    intro: '测试您的视觉反应。',
    path: '/reaction-time',
    best: 0, // 最佳成绩取最大值/最小值，0 取最小值，1取最大值 
    scoreRange: [100, 800], // 成绩取值范围
    unit: 'ms'
  },
  {
    id: 2,
    icon: iconName.numberMemory,
    title: '数字记忆',
    intro: '记住您看到的数字。',
    path: '/number-memory',
    best: 1,
    scoreRange: [3, 30],
    unit: '级'
  },
  {
    id: 3,
    icon: iconName.chimpTest,
    title: '黑猩猩测试',
    intro: '您比黑猩猩聪明吗？',
    path: '/chimp-test',
    best: 1,
    scoreRange: [4, 40],
    unit: '级'
  },
  {
    id: 4,
    icon: iconName.typingTest,
    title: '打字测试',
    intro: '您每分钟可以打多少字？',
    path: '/typing-test',
    best: 1,
    scoreRange: [30, 300],
    unit: '字'
  },
  {
    id: 5,
    icon: iconName.visualMemory,
    title: '视觉记忆',
    intro: '记住越来越多的方块。',
    path: '/visual-memory',
    best: 1,
    scoreRange: [1, 30],
    unit: '级'
  },
  {
    id: 6,
    icon: iconName.aimTest,
    title: '瞄准测试',
    intro: '您能多快击中目标？',
    path: '/aim-test',
    best: 0,
    scoreRange: [300, 1000],
    unit: 'ms'
  },
  {
    id: 7,
    icon: iconName.colorVisionTest,
    title: '色觉测试',
    intro: '快速找出不同的颜色。',
    path: '/color-vision-test',
    best: 1,
    scoreRange: [1, 100],
    unit: '级'
  },
  {
    id: 8,
    icon: iconName.stroop,
    title: '斯特鲁普',
    intro: '判断颜色是否正确。',
    path: '/stroop',
    best: 1,
    scoreRange: [0, 100],
    unit: '分'
  },
  {
    id: 9,
    icon: iconName.verbalMemory,
    title: '词汇记忆',
    intro: '尽可能记住更多的词汇。',
    path: '/verbal-memory',
    best: 1,
    scoreRange: [1, 200],
    unit: '个'
  },
  {
    id: 10,
    icon: iconName.sequentialMemory,
    title: '序列记忆',
    intro: '记住越来越长的序列。',
    path: '/sequential-memory',
    best: 1,
    scoreRange: [1, 30],
    unit: '级'
  },
  {
    id: 11,
    icon: iconName.luckTest,
    title: '运气测试',
    intro: '快乐的抽卡时刻。',
    path: '/luck-test',
    best: 1,
    scoreRange: [1, 100],
    unit: '百分位'
  },
  {
    id: 12,
    icon: iconName.handSpeedTest,
    title: '手速测试',
    intro: '您的手速如何？',
    path: '/hand-speed-test',
    best: 1,
    scoreRange: [10, 100],
    unit: '次'
  }
]