const express = require('express')
const router = express.Router()

const { register, login, getInfoByToken, changePassword } = require('../controller/users')

router.post('/register', register)
router.post('/login', login)
router.post('/token', getInfoByToken)
router.post('/changePassword', changePassword)

module.exports = router
