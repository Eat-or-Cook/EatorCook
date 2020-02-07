const { UserRecipe, UserRestaurant, Recipe, Restaurant } = require('../models')

function favRecipeCheck (req, res, next) {
    Recipe.findOne({
        where: {
            food: req.body.food
        }
    })
    .then(recipeResult => {
        if (!recipeResult) {
            next()
        } else {
            return UserRecipe.findOne({
                where: {
                    UserId: req.loggedUser.id,
                    RecipeId: recipeResult.id
                }
            })
        }
    })
    .then(result => {
        if(result) {
            throw ({
                statusCode: 400,
                message: 'You already liked this recipe'
            })
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

function favRestaurantCheck (req, res, next) {
    Restaurant.findOne({
        where: {
            name: req.body.name
        }
    })
    .then(restaurantResult => {
        if (!restaurantResult) {
            next()
        } else {
            return UserRestaurant.findOne({
                where: {
                    UserId: req.loggedUser.id,
                    RestaurantId: restaurantResult.id
                }
            })
        }
    })
    .then(result => {
        if(result) {
            throw ({
                statusCode: 400,
                message: 'You already liked this restaurant'
            })
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {
    favRecipeCheck,
    favRestaurantCheck
}