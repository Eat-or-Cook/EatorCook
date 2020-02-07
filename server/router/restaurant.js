const router = require('express').Router()
const controller = require('../controllers/restaurant')
const { favRestaurantCheck } = require('../middlewares/favCheck')
const auth = require('../middlewares/authentication')

router.get('/', controller.findAllFavRestaurants)

router.get('/:id', controller.findOneFavRestaurant)

router.post('/',auth, controller.addFavRestaurant)

router.delete('/:id',auth, controller.removeFavRestaurant)

module.exports = router