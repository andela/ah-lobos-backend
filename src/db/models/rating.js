'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Rating.associate = (models) => {
    Rating.belongsTo(models.Users, {
      foreignKey: 'user',
      targetKey: 'id'
    });
    Rating.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      targetKey: 'id'
    });
  };
  return Rating;
};
