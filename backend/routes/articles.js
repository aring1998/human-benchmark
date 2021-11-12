const express = require('express')
const router = express.Router()

const { randomArticle } = require('../controller/articles')

router.get('/randomArticle', randomArticle)

module.exports = router
