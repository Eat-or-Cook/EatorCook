'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRestaurant = sequelize.define('UserRestaurant', {
    UserId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER
  }, {});
  UserRestaurant.associate = function(models) {
    // associations can be defined here
    UserRestaurant.belongsTo(models.User)
    UserRestaurant.belongsTo(models.Restaurant)
  };
  return UserRestaurant;
};