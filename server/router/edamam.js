const router = require('express').Router()
const ControllerRecipe = require('../controllers/controller')
const auth = require('../middlewares/authentication')

router.get('/', ControllerRecipe.find)
router.get('/', auth, ControllerRecipe.find)

module.exports = router