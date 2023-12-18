const express = require('express')
const router = express.Router();
const staffController = require("../controllers/staffController")

router.get('/', staffController.showAllStaffs)
router.get('/single/:id', staffController.showSingleStaff)
router.get('/count', staffController.countStaff)
router.post('/check/email', staffController.checkEmail)
router.get('/camera/:id', staffController.getStaffFromCamera)
router.post('/create', staffController.addStaff)
router.put('/update/:id', staffController.updateStaffInfo)
router.delete('/delete/:id', staffController.deleteStaff)

module.exports = router;