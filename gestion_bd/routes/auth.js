const express = require('express')
const userController = require('../controllers/auth.controller')
const checkAuthMiddleware = require('../middleware/check-auth')


const router = express.Router()

router.post('/sign-up', checkAuthMiddleware.checkAuth, userController.signUp)
router.patch('/update-pwd', checkAuthMiddleware.checkAuth, userController.updatePasswd)
router.post('/login', userController.login)

module.exports = router