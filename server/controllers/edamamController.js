'use strict'
const findRecipes = require('../helper/findRecipes')
const modelRecipe = require('../models/index').Recipe
const recipe = require('./recipe')

class ControllerRecipe {

    static findRecipes (req, res, next){
        let { find } = req.query
        let token = 
        findRecipes(find)
        .then(resp => {
            let result = []
            let objResult = {}
            let objTotalNutrients = {}
            resp.data.hits.forEach(foodData => {
                objResult = { ingredient : foodData.recipe.ingredientLines , label : foodData.recipe.label , image : foodData.recipe.image }
                // objTotalNutrients = {totalNutrients : foodData.recipe.totalNutrients}
                // console.log({ ingredient : foodData.recipe.ingredientLines , label : foodData.recipe.label , image : foodData.recipe.image, totalNutrients : foodData.recipe.totalNutrients });
                result.push(objResult)
                // for (const key in foodData.recipe.totalNutrients) {
                //         for (const keyu in foodData.recipe.totalNutrients[key]) {
                //             console.log(foodData.recipe.totalNutrients[key][keyu])
                //         }
                //     }
                // }
                // result.push(objResult)
            });
            res.send(result)
        })
        .catch(err=>{
            res.send(err)
        })
        // res.send(find)
    }


    static likeRecipe(req,res,next){
        let temp
        modelRecipe
          .findRecipes(req.params.find)
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

module.exports=ControllerRecipe