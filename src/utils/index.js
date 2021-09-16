export const getFormKeys = formOptions => {
  const res = {}
  formOptions.forEach(item => {
    res[item.prop] = ''
  })
  return res
}