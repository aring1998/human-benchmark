const express = require('express')
const router = express.Router()

const { saveScore, getChartData, getBestScore } = require('../controller/scores')

router.post('/saveScore', saveScore)
router.get('/getChartData', getChartData)
router.get('/getBestScore', getBestScore)

module.exports = router
