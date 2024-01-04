const express = require('express')
const router = express.Router();
const controller = require('../controller/msgController')
const midleware = require('../midleware/midleware')

router.get('/getAll',midleware.authenticator, controller.getAll)
router.post('/add',midleware.isAdmin,midleware.isJournalist,controller.add)

module.exports = router
