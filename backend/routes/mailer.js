const express = require('express')
const router = express.Router()

const { feedback, resetMail } = require('../controller/mailer')

router.post('/feedback', feedback)
router.post('/resetMail', resetMail)

module.exports = router
