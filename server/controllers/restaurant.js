const { Restaurant, UserRestaurant, User } = require('../models')

class RestaurantController {
    static addFavRestaurant(req, res, next) {
        Restaurant.findOne({
            where: {
                name: req.body.name
            }
        })
        .then(restaurantData => {
            if(restaurantData){
                return restaurantData
            } else {
                return Restaurant.create({
                    name: req.body.name
                })
            }
        })
        .then(result => {
            let restaurantInfo = result
            return UserRestaurant.create({
                    UserId: req.loggedUser.id,
                    RestaurantId: restaurantInfo.id
                })
        })
        .then(finalResult => {
            res.status(201).json(finalResult)
        })
        .catch(err => {
            next(err)
        })
    }

    static removeFavRestaurant(req, res, next) {
        UserRestaurant.destroy({
            where: {
                UserId: req.loggedUser.id,
                RestaurantId: req.params.id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static findAllFavRestaurants(req, res, next) {
        UserRestaurant.findAll({
            where: {
                UserId: req.loggedUser.id
            },
            include: [{ model: Restaurant }]
        })
        .then(favRestaurants => {
            res.status(200).json(favRestaurants)
        })
        .catch(err => {
            next(err)
        })
    }

    static findOneFavRestaurant(req, res, next) {
        UserRestaurant.findOne({
            where: {
                UserId: req.loggedUser.id,
                RestaurantId: req.params.id
        },
        include: [{ model: Restaurant }]
        })
        .then(favRestaurant => {
            res.status(200).json(favRestaurant)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = RestaurantController