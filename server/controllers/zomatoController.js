const zomato = require('../helpers/zomato')
const {UserRestaurant,Restaurant} = require('../models')
class ZomatoController {
  static searchNearRestaurant(req,res,next){
    zomato
      .searchRestaurant(req.query.start)
      .then(result => {
        res.status(200).json(result.data)
      })
      .catch(next)
  }
  static searchRestaurantById(req,res,next){
    let temp
    zomato
      .searchRestaurantById(req.params.id)
      .then(result => {
        temp = result.data
        return UserRestaurant
                .findOne({
                  where : {
                    UserId: req.loggedUser.id,
                  },
                  include:[
                    {
                      model:Restaurant,
                      where:{
                        name: req.params.id
                      }
                    }
                  ]

                })
      })
      .then(result => {
        temp.userFavorite = result
        res.status(200).json(temp)
      })
      .catch(next)
  }
}

module.exports = ZomatoController