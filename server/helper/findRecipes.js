'use strict'
const axios = require('axios');


function findRecipes(food) {
    return axios.get(`https://api.edamam.com/search?q=${food}&app_id=c6185553&app_key=25b9789ec0f2543507a89ce26e63eb60&from=0&to=10&calories=591-722&health=alcohol-free`)    
}


module.exports=findRecipes