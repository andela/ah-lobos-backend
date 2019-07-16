'use strict';
module.exports = (sequelize, DataTypes) => {
  const likeDislikes = sequelize.define('likeDislikes', {
    userId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    like: DataTypes.BOOLEAN,
    dislike: DataTypes.BOOLEAN
  }, {});
  likeDislikes.associate = function(models) {
    // associations can be defined here
  };
  return likeDislikes;
};
