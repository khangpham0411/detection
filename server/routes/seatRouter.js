const express = require('express')
const router = express.Router();
const seatController = require('../controllers/seatController')

router.get('/staff/:id', seatController.getSeatFromStaff)
router.post('/update/staff/:id', seatController.updateSeatStaff)
router.post('/update/camera/:id', seatController.updateSeatCamera)

module.exports = router;