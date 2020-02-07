'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    food: DataTypes.STRING
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
    Recipe.belongsToMany(models.User, {through: models.UserRecipe})
  };
  return Recipe;
};