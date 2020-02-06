'use strict';
const bcrypt = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        },
        isEmail: {
          msg: 'Please use the correct email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        },
        len: {
          args: 5,
          msg: 'Password must be at least 6 characters'
        }
      }
      
    }
  },{
    hooks: {
      beforeCreate(instance) {
      return bcrypt.hash(instance.dataValues.password)
      .then(hashedPass => {
        instance.dataValues.password = hashedPass
        // console.log(User.password);
      })
      .catch(err => {
        console.log(err)
      })
      }
    },
    sequelize
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};