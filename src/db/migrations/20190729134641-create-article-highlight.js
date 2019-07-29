'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ArticleHighlights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      articleSlug: {
        type: Sequelize.STRING
      },
      highlightedBy: {
        type: Sequelize.INTEGER
      },
      highlightedText: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      selectFrom: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      selectTo: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      comment: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      articleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Articles',
          key: 'id',
          as: 'articleId'
        }
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
    return queryInterface.dropTable('ArticleHighlights');
  }
};
