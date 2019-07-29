import eventEmitter from '../../helpers/eventEmitter';

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
    image: {
        type: DataTypes.BLOB,
        allowNull: {
            args: true,
        }
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: {
            args: true
        }
    },
    readtime: {
        type: DataTypes.STRING,
        allowNull: {
            args: true
        }
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tagList: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
  }, {
      hooks: {
      afterCreate: async (article) => {
          const { authorId, slug } = article.dataValues;
          eventEmitter.emit('newArticle', authorId, slug);
      }
    }
  });
  Articles.associate = function(models) {
    Articles.belongsTo(models.Users, {
      as: 'author',
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });
    Articles.hasMany(models.Rating, {
      foreignKey: 'articleId'
    });
    Articles.hasMany(models.ArticleHighlight, {
      foreignKey: 'articleId',
    });
  };
  return Articles;
}
