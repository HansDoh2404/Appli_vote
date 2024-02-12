const express = require('express')
const postsController = require('../controllers/utils.controller')
const checkAuthMiddleware = require('../middleware/check-auth')

const router = express.Router()

//router.post('/', checkAuthMiddleware.checkAuth, postsController.save)
router.patch('/:id', checkAuthMiddleware.checkAuth, postsController.update)
router.get('/:id', postsController.show)
router.get('/', postsController.index) 
router.delete('/:id', checkAuthMiddleware.checkAuth, postsController.destroy)

module.exports = router