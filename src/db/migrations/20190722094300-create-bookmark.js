'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookmarks', {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.sequelize.query('ALTER TABLE "Bookmarks" ADD CONSTRAINT "permission" PRIMARY KEY ("userId", "slug")'));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookmarks');
  }
};
