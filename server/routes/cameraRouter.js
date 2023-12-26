const express = require('express')
const router = express.Router();
const cameraController = require('../controllers/cameraController')

router.get('/:user_id', cameraController.showAllCameras)
router.get('/single/:id/:user_id', cameraController.showSingleCamera)
router.get('/count/:user_id', cameraController.countCamera)
router.get('/name/:user_id', cameraController.getAllCameraNames)
router.get('/room/:id', cameraController.getRoomFromCamera)
router.get('/url/:id', cameraController.getCameraUrl)
router.get('/staff/:id', cameraController.getCameraFromStaff)
router.post('/check/camerano', cameraController.checkCameraNoExist)
router.post('/create', cameraController.addCamera)
router.put('/update/:id', cameraController.updateCamera)
router.delete('/delete/:id', cameraController.deleteCamera)

module.exports = router;