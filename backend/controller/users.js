const usersModal = require('../modals/users')
const { suc, fail } = require('../utils/render')

const register = async (req, res, next) => {
  const { username, password } = req.body

  // 判断是否存在同用户名
  const userInfo = await usersModal.findUser({ username })
  if (userInfo) return fail(res, '已存在该用户！')

  await usersModal.register({
    username,
    password,
  })

  suc(res, {
    username,
    password,
  }, '注册成功！')
}

const login = async (req, res, next) => {
  const { username, password } = req.body

  const userInfo = await usersModal.findUser({ username })
  if (!userInfo) return fail(res, '用户名不存在！')
  // 更新用户token
  await usersModal.updateToken(userInfo._id)

  const data = await usersModal.findUser({ username, password })
  if (!data) return fail(res, '密码错误！')
  delete data.password
  suc(res, {
    ...data,
  }, '登录成功！')
}

const token = async (req, res, next) => {
  const { token } = req.token

  const userInfo = await usersModal.findUser({ token })
}

module.exports = {
  register,
  login,
}
