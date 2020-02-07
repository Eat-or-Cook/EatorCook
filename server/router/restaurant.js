const router = require('express').Router()
const controller = require('../controllers/restaurant')
const { favRestaurantCheck } = require('../middlewares/favCheck')

router.get('/', controller.findAllFavRestaurants)

router.get('/:id', controller.findOneFavRestaurant)

router.post('/', favRestaurantCheck, controller.addFavRestaurant)

router.delete('/:id', controller.removeFavRestaurant)

module.exports = router