const router = require('express').Router()
const zomatoRouter = require('./zomato')
const user = require('./user')

router.use('/zomato',zomatoRouter)

router.use('/', user)

module.exports = router