'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Notifications', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        preference: {
          type: Sequelize.ENUM('inApp', 'email'),
          allowNull: true,
          defaultValue: 'inApp'
        },
        url: {
          type: Sequelize.STRING,
          allowNull: true
        },
        status: {
          type: Sequelize.ENUM('seen', 'unseen'),
          allowNull: false,
          defaultValue: 'unseen'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Notifications');
  }
};
