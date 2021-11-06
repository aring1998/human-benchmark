const express = require('express')
const router = express.Router()

const { saveScore, getChartData } = require('../controller/scores')

router.post('/saveScore', saveScore)
router.get('/getChartData', getChartData)

module.exports = router
