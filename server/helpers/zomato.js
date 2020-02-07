const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1/',
  headers: {
    'user-key' : "6ae7e0350171023d4749315f9816097e",
  },
});

function searchRestaurant(start=0){
  let opt = {
    params:{
      'lat' : -6.2607134,
      'lon' : 106.7794221,
      'radius' : 1000,
      'start' : start,
      'count' : 10
    }
  }

  return instance
    .get('search',opt)
}

function searchRestaurantById(id){
  let opt = {
    params:{
      res_id : id
    }
  }

  return instance
    .get('restaurant',opt)
}

module.exports = { searchRestaurant,searchRestaurantById }