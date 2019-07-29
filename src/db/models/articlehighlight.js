'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArticleHighlight = sequelize.define('ArticleHighlight', {
    articleSlug: DataTypes.STRING,
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    highlightedBy: DataTypes.INTEGER,
    highlightedText: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    comment: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: ''
    },
    selectFrom: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    selectTo: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    }
  }, {});
  ArticleHighlight.associate = function(models) {
    // associations can be defined here
    ArticleHighlight.belongsTo(models.Articles, {
      as: 'article',
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return ArticleHighlight;
};
