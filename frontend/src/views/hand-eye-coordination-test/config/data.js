export const aboutText = [
  '手眼协调能力是眼睛和手的配合能力，主要是指根据眼睛看到的变化，用手来做出相应的反应',
  '在每一个关卡中，请点击鼠标（或触摸屏幕）将两个运行的圆球停下。',
  '关卡结束后，将根据结果计算得分。当两个球都停在虚线圆环之内，圆环变绿，本轮得2分；当只有一个球都停在虚线圆环之内，圆环变黄，本轮得1分。',
  '注意，请尽量让这两个圆球停止在白色的虚线圆环之内，当两个球都未在虚线圆环内停下，则游戏结束。'
]

const levelValue = {
  1: {
    targetDiameter: 150,
    runTime: 3
  },
  2: {
    targetDiameter: 130,
    runTime: 2.5
  },
  3: {
    targetDiameter: 120,
    runTime: 2
  },
  4: {
    targetDiameter: 120,
    runTime: 1.3
  },
  5: {
    targetDiameter: 90,
    runTime: 1.3
  },
  6: {
    targetDiameter: 90,
    runTime: 0.8
  },
  7: {
    targetDiameter: 110,
    runTime: 0.5
  },
  8: {
    targetDiameter: 80,
    runTime: 0.7
  },
  9: {
    targetDiameter: 130,
    runTime: 0.4
  },
  10: {
    targetDiameter: 100,
    runTime: 0.4
  },
  11: {
    targetDiameter: 90,
    runTime: 0.4
  },
  12: {
    targetDiameter: 150,
    runTime: 0.3
  },
  13: {
    targetDiameter: 130,
    runTime: 0.3
  },
  14: {
    targetDiameter: 100,
    runTime: 0.3
  },
  15: {
    targetDiameter: 140,
    runTime: 0.25
  },
  16: {
    targetDiameter: 90,
    runTime: 0.3
  },
  17: {
    targetDiameter: 100,
    runTime: 0.25
  },
  18: {
    targetDiameter: 90,
    runTime: 0.25
  },
  19: {
    targetDiameter: 80,
    runTime: 0.25
  }
}

export const getLevelValue = level => {
  if (level >= 20) {
    return {
      targetDiameter: 70,
      runTime: 0.25
    }
  }
  return levelValue[level]
}
