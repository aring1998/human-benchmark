// 深拷贝对象
export const deepCloneObj = obj => {
  return JSON.parse(JSON.stringify(obj))
}

// 深拷贝对象数组
export const deepCloneObjArr = data => {
  const res = data instanceof Array ? [] : {}
  for (let item in data) {
    res[item] = typeof data[item] === 'object' ? deepCloneObjArr(data[item]) : data[item]
  }
  return res;
}

// 下划线命名转换小驼峰命名
export const smallHumpNaming = data => {
  return data.replace(/\-(\w)/g, (all, letter) => letter.toUpperCase())
}

// 下划线命名转换大驼峰命名
export const bigHumpNaming = data => {
  return data.replace(/(^|-)(\w)/g, (all, symbol, letter) => letter.toUpperCase())
}

// 获取表单键值，引用可根据表单配置初始化组件中的表单数据
export const getFormKeys = formOptions => {
  const res = {}
  formOptions.forEach(item => {
    res[item.prop] = ''
  })
  return res
}