const express = require('express')
const router = express.Router()

const { register, login, getInfoByToken } = require('../controller/users')

router.post('/register', register)
router.post('/login', login)
router.post('/token', getInfoByToken)

module.exports = router
