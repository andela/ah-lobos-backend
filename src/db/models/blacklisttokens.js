'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlacklistTokens = sequelize.define('BlacklistTokens', {
    token: DataTypes.TEXT,
    expires: DataTypes.BIGINT
  }, {});
  BlacklistTokens.associate = function(models) {
    // associations can be defined here
  };
  return BlacklistTokens;
};