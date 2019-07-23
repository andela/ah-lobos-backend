'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', {
    permissionNo: DataTypes.INTEGER,
    role: DataTypes.STRING,
    action: DataTypes.STRING,
    resources: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Permissions.associate = function(models) {
    // associations can be defined here
  };
  Permissions.removeAttribute('id');
  return Permissions;
};
