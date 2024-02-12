const express = require('express')
const testController = require('../controllers/test.controller')
const checkAuthMiddleware = require('../middleware/check-auth')

const router = express.Router()

router.get("/associations", checkAuthMiddleware.checkAuth, testController.test)
router.get("/nb-votes", testController.nbVotes)

module.exports = router