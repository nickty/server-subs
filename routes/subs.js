const express = require('express')
const { prices, createSubscription } = require('../controllers/prices')

const router = express.Router()

router.get('/prices', prices)
router.post('/create-subscription', createSubscription)

module.exports = router
