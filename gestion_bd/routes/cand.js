const express = require('express')
const candController = require('../controllers/cand.controller')
const checkAuthMiddleware = require('../middleware/check-auth')

const router = express.Router()

router.post('/', checkAuthMiddleware.checkAuth, candController.saveCand) 
router.post('/update', checkAuthMiddleware.checkAuth, candController.updateCand) 

module.exports = router