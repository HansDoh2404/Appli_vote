const express = require('express')
const adminController = require('../controllers/admin.controller')


const router = express.Router()

router.post('/sign-ad', adminController.signUp_ad)
router.post('/login-ad', adminController.login_ad)

module.exports = router