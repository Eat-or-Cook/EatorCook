const zomato = require('../helpers/zomato')
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
    zomato
      .searchRestaurantById(req.params.id)
      .then(result => {
        res.status(200).json(result.data)
      })
      .catch(next)
  }
}

module.exports = ZomatoController