const express = require('express')
const { prices } = require('../controllers/prices')

const router = express.Router()

router.get('/prices', prices)

module.exports = router
