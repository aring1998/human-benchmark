const express = require('express')
const router = express.Router()

const { register, login, getInfoByToken, changePassword, resetPassword } = require('../controller/users')

router.post('/register', register)
router.post('/login', login)
router.post('/token', getInfoByToken)
router.post('/changePassword', changePassword)
router.post('/resetPassword', resetPassword)

module.exports = router
