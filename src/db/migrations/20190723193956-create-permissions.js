'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return (queryInterface.createTable('Permissions', {
      permissionNo: {
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.STRING
      },
      action: {
        type: Sequelize.STRING
      },
      resources: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => {
      queryInterface.sequelize.query('ALTER TABLE "Permissions" ADD CONSTRAINT "bookmark-pks" PRIMARY KEY ("role", "resources", "action")')
    })
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Permissions');
  }
};
