const express = require('express')
const router = express.Router();
const staffController = require("../controllers/staffController")

router.get('/:id', staffController.showAllStaffs)
router.get('/single', staffController.showSingleStaff)
router.get('/count/:id', staffController.countStaff)
router.post('/check/email', staffController.checkEmail)
router.get('/camera/:id/:user_id', staffController.getStaffFromCamera)
router.post('/create', staffController.addStaff)
router.put('/update/:id/:user_id', staffController.updateStaffInfo)
router.delete('/delete/:id', staffController.deleteStaff)

module.exports = router;