'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define(
    'Notifications',
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
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      preference: {
        type: DataTypes.ENUM('inApp', 'email'),
        allowNull: true,
        defaultValue: 'inApp'
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('seen', 'unseen'),
        allowNull: false,
        defaultValue: 'unseen'
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
  Notifications.associate = function (models) {
    // associations can be defined here
    Notifications.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return Notifications;
};
