const express = require('express')
const router = express.Router();
const historyController = require('../controllers/historyController')

router.post('/staff/total', historyController.showTotalWorkingHours)
router.post('/all/total', historyController.showAllTotalWorkingHours)
router.post('/staff/daysoff', historyController.showDaysOff)

module.exports = router;