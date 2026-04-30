const express = require('express')
const router = express.Router()

const { saveScore, getChartData, getBestScore, getScorePercentile } = require('../controller/scores')

router.post('/saveScore', saveScore)
router.get('/getChartData', getChartData)
router.post('/getBestScore', getBestScore)
router.post('/getScorePercentile', getScorePercentile)
router.get('/getScorePercentile', getScorePercentile)

module.exports = router
