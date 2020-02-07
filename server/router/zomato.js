const zomatoController = require('../controllers/zomatoController')
const router = require('express').Router()

router.get("/",zomatoController.searchNearRestaurant)
router.get("/:id",zomatoController.searchRestaurantById)

module.exports = router


