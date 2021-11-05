const uuid = require('uuid')
const { Users } = require('../utils/db')

const findUser = async (data) => {
  const res = await Users.findOne({ ...data })
  return res?._doc
}

const register = ({ username, password }) => {
  const user = new Users({
    username,
    password,
  })
  console.log(user)
  user.save()
}

const updateToken = (id) => {
  const token = uuid.v4()
  return Users.updateOne({ id }, { token })
}

module.exports = {
  findUser,
  register,
  updateToken,
}
