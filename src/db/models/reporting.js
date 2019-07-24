'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reporting = sequelize.define('Reporting', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    reporter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Reporting.associate = function(models) {
    Reporting.belongsTo(models.Users, {
      foreignKey: 'reporter',
      targetKey: 'id'
    });
    Reporting.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      targetKey: 'id'
    });
  };
  return Reporting;
};
