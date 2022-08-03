const express = require('express')
const router = express.Router()

const { getNotices } = require('../controller/notices')

router.get('/getNotices', getNotices)

module.exports = router
