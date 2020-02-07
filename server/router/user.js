const router = require('express').Router()
const controller = require('../controllers/user')

router.post('/', controller.register)

router.post('/login', controller.login)

router.post('/googleSignIn', controller.googleSignIn)

module.exports = router