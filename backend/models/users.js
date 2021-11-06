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
    token: uuid.v4()
  })
  return user.save()
}

const updateUser = (query, value) => {
  Users.updateOne(query, value, (err, res) => {
    if (!err) {
      console.log(res);
      return res
    }
  })
}

const updateToken = (id) => {
  const token = uuid.v4()
  return Users.updateOne({ id }, { token })
}

module.exports = {
  findUser,
  findUserAllInfo,
  addUser,
  updateUser,
  updateToken,
}
