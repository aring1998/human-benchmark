// 在此写标准的路径可不用在路由中配置
import { iconName } from "@/assets/js/iconName"
export const gameList = [
  {
    icon: iconName.reactionTime,
    title: '反应时间',
    intro: '测试您的视觉反应。',
    path: '/reaction-time'
  },
  {
    icon: iconName.numberMemory,
    title: '数字记忆',
    intro: '记住您看到的数字。',
    path: '/number-memory'
  },
  {
    icon: iconName.chimpTest,
    title: '黑猩猩测试',
    intro: '您比黑猩猩聪明吗？',
    path: '/chimp-test'
  },
  {
    icon: iconName.typingTest,
    title: '打字测试',
    intro: '您每分钟可以打多少字？',
    path: '/typing-test'
  },
  {
    icon: iconName.visualMemory,
    title: '视觉记忆',
    intro: '记住越来越多的方块。',
    path: '/visual-memory'
  },
  {
    icon: iconName.aimTest,
    title: '瞄准测试',
    intro: '您能多快击中目标？',
    path: '/aim-test'
  },
  {
    icon: iconName.colorVisionTest,
    title: '色觉测试',
    intro: '快速找出不同的颜色。',
    path: '/color-vision-test'
  },
  {
    icon: iconName.stroop,
    title: '斯特鲁普',
    intro: '判断颜色是否正确。',
    path: '/stroop'
  },
  {
    icon: iconName.verbalMemory,
    title: '词汇记忆',
    intro: '尽可能记住更多的词汇。',
    path: '/verbal-memory'
  },
  {
    icon: iconName.sequentialMemory,
    title: '序列记忆',
    intro: '记住越来越长的序列。',
    path: '/sequential-memory'
  }
]