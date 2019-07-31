'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotificationConfigs = sequelize.define(
    'NotificationConfigs',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      config: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, {});
  NotificationConfigs.associate = function (models) {
    // associations can be defined here
    NotificationConfigs.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return NotificationConfigs;
};
