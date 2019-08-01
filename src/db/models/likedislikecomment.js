'use strict';
module.exports = (sequelize, DataTypes) => {
  const LikeDislikeComment = sequelize.define('LikeDislikeComment', {
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    like: DataTypes.BOOLEAN,
    dislike: DataTypes.BOOLEAN
  }, {});
  LikeDislikeComment.associate = function(models) {
    // associations can be defined here
  };
  return LikeDislikeComment;
};
