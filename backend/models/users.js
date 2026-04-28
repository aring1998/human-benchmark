const uuid = require('uuid')
const { Users } = require('../db/index')

const findUser = async (data) => {
  return Users.findOne({ ...data })
    .select('-password')
    .lean()
}

const findUserAllInfo = async (data) => {
  return Users.findOne({ ...data }).lean()
}

const addUser = (data) => {
  const user = new Users({
    ...data,
    token: uuid.v4(),
    created: Date.now()
  })
  return user.save()
}

const updateUser = (query, value) => {
  return Users.updateOne(query, value)
}

const updateToken = (id) => {
  const token = uuid.v4()
  return Users.updateOne({ _id: id }, { token })
}

module.exports = {
  findUser,
  findUserAllInfo,
  addUser,
  updateUser,
  updateToken
}
