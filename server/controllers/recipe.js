const { Recipe, UserRecipe, User } = require('../models')

class RecipeController {
    static addFavRecipe(req, res, next) {
        let recipeInfo
        Recipe.findOne({
            where: {
                food: req.body.food
            }
        })
        .then(recipeData => {
            if(recipeData){
                recipeInfo = recipeData
                return
            } else {
                return Recipe.create({
                    food: req.body.food
                })
            }
        })
        .then(result => {
            recipeInfo = result
            UserRecipe.create({
                UserId: req.loggedUser.id,
                RecipeId: recipeInfo.id
            })
        })
        .then(finalResult => {
            res.status(201).json(finalResult)
        })
        .catch(err => {
            next(err)
        })
    }

    static removeFavRecipe(req, res, next) {
        UserRecipe.destroy({
            where: {
                UserId: req.loggedUser.id,
                RecipeId: req.params.id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static findAllFavRecipes(req, res, next) {
        UserRecipe.findAll({
            where: {
                UserId: req.loggedUser.id
            },
            include: [{ model: Recipe }]
        })
        .then(favRecipes => {
            res.status(200).json(favRecipes)
        })
        .catch(err => {
            next(err)
        })
    }

    static finOneFavRecipe(req, res, next) {
        UserRecipe.findOne({
            where: {
                UserId: req.loggedUser.id,
                RecipeId: req.params.id
        },
        include: [{ model: Recipe }]
        })
        .then(favRecipe => {
            res.status(200).json(favRecipe)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = RecipeController