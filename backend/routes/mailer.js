const express = require('express')
const router = express.Router()

const { feedback } = require('../controller/mailer')

router.post('/feedback', feedback)

module.exports = router
