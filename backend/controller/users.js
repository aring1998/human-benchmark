const usersModel = require('../models/users')
const { suc, fail } = require('../utils/render')

/**
 * 注册
 */
const register = async (req, res, next) => {
  const { username, password } = req.body

  // 判断是否存在同用户名
  const userInfo = await usersModel.findUser({ username })
  if (userInfo) return fail(res, '该用户名已被注册')

  const data = await usersModel.addUser({
    username,
    password,
  })

  suc(res, { token: data.token }, '注册成功')
}

/**
 * 登录
 */
const login = async (req, res, next) => {
  const { username, password } = req.body

  const userInfo = await usersModel.findUser({ username })
  if (!userInfo) return fail(res, '用户名不存在')
  // 更新用户token
  await usersModel.updateToken(userInfo._id)

  const data = await usersModel.findUser({ username, password })
  if (!data) return fail(res, '密码错误')
  suc(res, data, '登录成功！')
}

/**
 * 根据token获取用户信息
 */
const getInfoByToken = async (req, res, next) => {
  const token = req.headers.authorization
  const data = await usersModel.findUser({ token })
  if (!data) return fail(res, '登录信息已过期，请重新登陆')

  suc(res, data, `欢迎回来，${data.username}`)
}

/**
 * 修改密码
 */
const updatePassword = async (req, res, next) => {
  const token = req.headers.authorization
  const { oldPassword, newPassword } = req.body
  const userInfo = await usersModel.findUserAllInfo({ token })
  if (!userInfo) return fail(res, '登录状态有误，请重新登录')

  if (oldPassword !== newPassword) return fail(res, '原密码错误')
  const data = await usersModel.updateUser({ token }, { password: newPassword })
  suc(res, data, '修改密码成功')
}

module.exports = {
  register,
  login,
  getInfoByToken,
  updatePassword
}