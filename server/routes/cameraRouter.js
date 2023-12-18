const express = require('express')
const router = express.Router();
const cameraController = require('../controllers/cameraController')

router.get('/', cameraController.showAllCameras)
router.get('/single/:id', cameraController.showSingleCamera)
router.get('/count', cameraController.countCamera)
router.get('/name', cameraController.getAllCameraNames)
router.get('/room/:id', cameraController.getRoomFromCamera)
router.get('/url/:id', cameraController.getCameraUrl)
router.get('/staff/:id', cameraController.getCameraFromStaff)
router.post('/create', cameraController.addCamera)
router.put('/update/:id', cameraController.updateCamera)
router.delete('/delete/:id', cameraController.deleteCamera)

module.exports = router;