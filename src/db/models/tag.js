'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tagCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  Tag.associate = function(models) {
  };
  return Tag;
};
