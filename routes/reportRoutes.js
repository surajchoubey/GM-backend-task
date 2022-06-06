const express = require('express')
const router = express.Router()
const controllers = require('../controllers/report')

router.get('/', controllers.get_report)

router.post('/', controllers.post_report)

module.exports = router;
