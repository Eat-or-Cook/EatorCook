const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1/',
  timeout: 1000,
  headers: {
    'user-key' : "6ae7e0350171023d4749315f9816097e",
  },
});

function searchRestaurant(){
  let opt = {
    params:{
      'lat' : -6.2607134,
      'lon' : 106.7794221,
      'radius' : 1000
    }
  }

  return instance
    .get('search',opt)
}
module.exports = {searchRestaurant}