// 在此写标准的路径可不用在路由中配置
import { iconName } from "@/assets/js/icon-name"
export const gameList = [
  {
    id: 1,
    icon: iconName.reactionTime,
    title: '反应时间',
    intro: '测试您的视觉反应。',
    path: '/reaction-time'
  },
  {
    id: 2,
    icon: iconName.numberMemory,
    title: '数字记忆',
    intro: '记住您看到的数字。',
    path: '/number-memory'
  },
  {
    id: 3,
    icon: iconName.chimpTest,
    title: '黑猩猩测试',
    intro: '您比黑猩猩聪明吗？',
    path: '/chimp-test'
  },
  {
    id: 4,
    icon: iconName.typingTest,
    title: '打字测试',
    intro: '您每分钟可以打多少字？',
    path: '/typing-test'
  },
  {
    id: 5,
    icon: iconName.visualMemory,
    title: '视觉记忆',
    intro: '记住越来越多的方块。',
    path: '/visual-memory'
  },
  {
    id: 6,
    icon: iconName.aimTest,
    title: '瞄准测试',
    intro: '您能多快击中目标？',
    path: '/aim-test'
  },
  {
    id: 7,
    icon: iconName.colorVisionTest,
    title: '色觉测试',
    intro: '快速找出不同的颜色。',
    path: '/color-vision-test'
  },
  {
    id: 8,
    icon: iconName.stroop,
    title: '斯特鲁普',
    intro: '判断颜色是否正确。',
    path: '/stroop'
  },
  {
    id: 9,
    icon: iconName.verbalMemory,
    title: '词汇记忆',
    intro: '尽可能记住更多的词汇。',
    path: '/verbal-memory'
  },
  {
    id: 10,
    icon: iconName.sequentialMemory,
    title: '序列记忆',
    intro: '记住越来越长的序列。',
    path: '/sequential-memory'
  },
  {
    id: 11,
    icon: iconName.luckTest,
    title: '运气测试',
    intro: '快乐的抽卡时刻。',
    path: '/luck-test'
  },
  {
    id: 12,
    icon: iconName.handSpeedTest,
    title: '手速测试',
    intro: '您的手速如何？',
    path: '/hand-speed-test'
  }
]