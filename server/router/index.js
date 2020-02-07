const router = require('express').Router()
const zomatoRouter = require('./zomato')

router.use('/zomato',zomatoRouter)

module.exports = router