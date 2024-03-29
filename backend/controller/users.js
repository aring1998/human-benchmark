const usersModel = require('../models/users')
const { suc, fail } = require('../utils/render')

/**
 * 注册
 */
const register = async (req, res) => {
  const { email, username, password } = req.body

  // 判断是否存在同用户名
  const userInfo = await usersModel.findUser({ username })
  if (userInfo) return fail(res, '该用户名已被注册')

  if (email) {
    const emailInfo = await usersModel.findUser({ email })
    if (emailInfo) return fail(res, '该邮箱已被使用')
  }

  const data = await usersModel.addUser({
    email,
    username,
    password,
  })
  delete data.password

  suc(res, data, '注册成功，已为您自动登录')
}

/**
 * 登录
 */
const login = async (req, res) => {
  const { username, password } = req.body

  const userInfo = await usersModel.findUserAllInfo({ username })
  if (!userInfo) return fail(res, '用户名不存在')

  if (userInfo.password !== password) return fail(res, '密码错误')

  // 更新用户token
  // TODO 在登录时暂时不更新用户token
  // await usersModel.updateToken(userInfo._id)

  const data = await usersModel.findUser({ _id: userInfo._id })
  suc(res, data, '登录成功')
}

/**
 * 根据token获取用户信息
 */
const getInfoByToken = async (req, res) => {
  const token = req.headers.authorization
  const data = await usersModel.findUser({ token })
  if (!data) return fail(res, '登录信息已过期，请重新登陆')

  suc(res, data, `欢迎回来，${data.username}`)
}

/**
 * 修改密码
 */
const changePassword = async (req, res) => {
  const token = req.headers.authorization
  const { oldPassword, newPassword } = req.body
  const userInfo = await usersModel.findUserAllInfo({ token })
  if (!userInfo) return fail(res, '登录状态有误，请重新登录')

  if (oldPassword !== userInfo.password) return fail(res, '原密码错误')
  await usersModel.updateUser({ token }, { password: newPassword })
  usersModel.updateToken()
  suc(res, {}, '修改密码成功，请重新登录')
}

/**
 * 重置密码
 */
const resetPassword = async (req, res) => {
  const { vCode, email, newPassword } = req.body
  const reg = new RegExp(`^${email}$`, 'i')
  const userInfo = await usersModel.findUser({ email: reg })
  if (!userInfo) return fail(res, '账号信息有误，请联系管理员')

  if (!vCode || vCode !== userInfo.vCode) return fail(res, '验证码有误')
  await usersModel.updateUser({ email: reg }, { password: newPassword, vCode: null })
  usersModel.updateToken()
  suc(res, {}, '修改密码成功，请重新登录')
}

module.exports = {
  register,
  login,
  getInfoByToken,
  changePassword,
  resetPassword,
}
