const express = require('express')
const router = express.Router()

const { randomWords } = require('../controller/words')

router.get('/randomWords', randomWords)

module.exports = router
