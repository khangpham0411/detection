const express = require('express')
const router = express.Router();
const roomController = require('../controllers/roomController')

router.get('/', roomController.showAllRooms)
router.get('/single/:id', roomController.showSingleRoom)
router.post('/create', roomController.addRoom)
router.get('/name/:user_id', roomController.getRoomName)
router.get('/count/:id', roomController.countRoom)
router.get('/staffs/:id', roomController.getStaffs)
router.put('/update/:id', roomController.updateRoom)
router.delete('/delete/:id', roomController.deleteRoom)

module.exports = router;