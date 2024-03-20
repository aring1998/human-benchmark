// 深拷贝对象
export const deepCloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// 深拷贝对象数组
export const deepCloneObjArr = (data) => {
  const res = data instanceof Array ? [] : {}
  for (let item in data) {
    res[item] = typeof data[item] === 'object' ? deepCloneObjArr(data[item]) : data[item]
  }
  return res
}

// 节流
export const debounce = (fn, delay) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}

// 下划线命名转换小驼峰命名
export const smallHumpNaming = (data) => {
  return data.replace(/\-(\w)/g, (all, letter) => letter.toUpperCase())
}

// 获取表单键值，引用可根据表单配置初始化组件中的表单数据
export const getFormKeys = (formOptions) => {
  const res = {}
  formOptions.forEach((item) => {
    res[item.prop] = ''
  })
  return res
}

// 设定区间为 min ~ max 的间隔数组
export const newArray = (min, max, section = 1) => {
  const data = []
  for (let i = min; i <= max; i += section) {
    data.push(i)
  }
  return data
}

// 创建图标配置
export const createChartOptions = (min, max, section) => {
  return {
    xAxis: {
      type: 'category',
      data: newArray(min, max, section),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true,
      },
    ],
  }
}

export const getRandomIntNumber = (min, max) => Math.floor(Math.random() * (max - min) + min)
