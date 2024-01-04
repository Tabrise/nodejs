const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')
const midleware = require('../midleware/midleware')

router.get('/getAll',midleware.isAdmin, userController.getAllUser)
router.post('/register',userController.register)
router.post('/connexion',userController.login)

module.exports = router