const express = require('express')
const router = express.Router()

const { feedback, resetMail } = require('../controller/mailer')
const { limitIpReqPerMin } = require('../middles/rate-limit')

router.post('/feedback', feedback)
router.post('/resetMail', limitIpReqPerMin(1), resetMail)

module.exports = router
