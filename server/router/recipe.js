const router = require('express').Router()
const controller = require('../controllers/recipe')
const { favRecipeCheck } = require('../middlewares/favCheck')

router.get('/', controller.findAllFavRecipes)

router.get('/:id', controller.finOneFavRecipe)

router.post('/', controller.addFavRecipe)

router.delete('/:id', controller.removeFavRecipe)

module.exports = router