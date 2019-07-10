export default (sequelize, DataTypes) => {
  const Articles = sequelize.define('Articles', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        message: 'Please enter article title'
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        message: 'Please enter article body'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        message: 'Please enter article description'
      }
    },
    favoritesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    image: DataTypes.BLOB,
    slug: DataTypes.STRING,
  }, {});
  Articles.associate = function(models) {
    // associations can be defined here
    Articles.belongsTo(models.Users, {
      foreignKey: 'postedBy',
      onDelete: 'CASCADE'
    });
  };
  return Articles;
}
