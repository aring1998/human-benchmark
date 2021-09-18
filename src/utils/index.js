// 深拷贝对象
export const deepCloneObj = obj => {
  return JSON.parse(JSON.stringify(obj))
}

// 深拷贝对象数组
export const deepCloneObjArr = data => {
  const res = data instanceof Array ? [] : {};
  for (let item in data) {
      res[item] = typeof data[item] === 'object' ? deepCloneObjArr(data[item]) : data[item];
  }
  return res;
}

// 命名下划线格式换小驼峰命名
export const humpNaming = data => {
  const res = {}
  for (let key in data) {
    let newKey = key.replace(/_([a-z])/g, (p, m) => m.toUpperCase())
    res[newKey] = humpNaming(data[key])
  }
  return res
}

// 获取表单键值
export const getFormKeys = formOptions => {
  const res = {}
  formOptions.forEach(item => {
    res[item.prop] = ''
  })
  return res
}