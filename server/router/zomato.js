const zomatoController = require('../controllers/zomatoController')
const router = require('express').Router()
const auth = require('../middlewares/authentication')
router.get("/",zomatoController.searchNearRestaurant)
router.get("/:id",auth,zomatoController.searchRestaurantById)

module.exports = router


