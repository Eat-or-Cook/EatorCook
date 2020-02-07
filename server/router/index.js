const router = require('express').Router()
const zomatoRouter = require('./zomato')
const user = require('./user')
const restaurant = require('./restaurant')
const recipe = require('./recipe')
const edamamRouter= require("./edamam")

router.use('/edamam', edamamRouter)

router.use('/zomato',zomatoRouter)

router.use('/', user)

router.use('/recipe', recipe)

router.use('/restaurant', restaurant)

module.exports = router