const router = require('express').Router()
const ControllerRecipe = require('../controllers/edamamController')
const auth = require('../middlewares/authentication')

router.get('/',auth,  ControllerRecipe.findRecipes)

module.exports = router