// 深拷贝对象
export const deepCloneObj = obj => {
  return JSON.parse(JSON.stringify(obj))
}

// 获取表单键值
export const getFormKeys = formOptions => {
  const res = {}
  formOptions.forEach(item => {
    res[item.prop] = ''
  })
  return res
}