const express = require('express')
const router = express.Router()
const home = require('./default')

router.use('/', home)

module.exports = router