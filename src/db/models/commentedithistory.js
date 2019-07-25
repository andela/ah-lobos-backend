'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentEditHistory = sequelize.define('CommentEditHistory', {
    body: DataTypes.TEXT,
    bodyId: DataTypes.INTEGER,
    newBody:DataTypes.TEXT
  }, {});
  CommentEditHistory.associate = function(models) {
    // associations can be defined here
  };
  return CommentEditHistory;
};
