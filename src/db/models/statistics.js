'use strict';
module.exports = (sequelize, DataTypes) => {
  const Statistics = sequelize.define('Statistics', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    numberOfReading: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {});
  Statistics.associate = function(models) {
    Statistics.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
    Statistics.belongsTo(models.Articles, {
      foreignKey: 'articleId'
    });
  };
  return Statistics;
};
