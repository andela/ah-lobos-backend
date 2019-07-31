'use strict';
module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define('Followers', {
    follower: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
     }
    },
    followee: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
     }
    }
  }, {});
  Followers.associate = function(models) {
    // associations can be defined here
    Followers.belongsTo(models.Users, {
      foreignKey: 'follower'
    });
    Followers.belongsTo(models.Users, {
      foreignKey: 'followee'
    });
  };
  return Followers;
};
