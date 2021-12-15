const uuid = require('uuid')
const { Users } = require('../db/index')

const findUser = async (data) => {
  const res = await Users.findOne({ ...data })
  delete res?._doc?.password
  return res?._doc
}

const findUserAllInfo = async (data) => {
  const res = await Users.findOne({ ...data })
  return res?._doc
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
  updateToken,
}
