export default (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    userId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: {
            args: false,
            message: 'User id must is required'
        }
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            message: 'The slug of the story is required'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: {
            args: true
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: {
            args: true
        }
    }
  });
  Bookmark.associate = function(models) {
    // associations can be defined here
  };
  Bookmark.removeAttribute('id');
  return Bookmark;
};
