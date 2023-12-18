const express = require('express')
const router = express.Router();
const historyController = require('../controllers/historyController')

router.post('/staff/total', historyController.showTotalWorkingHours)

module.exports = router;