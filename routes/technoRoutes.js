const express = require('express')
const router = express.Router();
const controller = require('../controller/technoController')
const midleware = require('../midleware/midleware')

router.get('/getAll',midleware.authenticator, controller.getAll)
router.post('/add',midleware.authenticator, midleware.isAdmin,controller.add)
router.post('/update/:id',midleware.authenticator,midleware.isAdmin ,controller.update)
router.post('/delete/:id',midleware.authenticator,midleware.isAdmin ,controller.delete)

module.exports = router
