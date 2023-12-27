const express = require('express')
const router = express.Router();
const userController = require("../controllers/userController")

router.get('/single/:id', userController.showSingleUser)
router.put('/update/:id', userController.updateInfoUser)
router.get('/check/email', userController.checkEmailExist)

module.exports = router;