import eventEmitter from '../../helpers/eventEmitter';

export default (sequelize, DataTypes) => {
  const likeDislikes = sequelize.define('likeDislikes', {
    userId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    like: DataTypes.BOOLEAN,
    dislike: DataTypes.BOOLEAN
  }, {
      hooks: {
      afterCreate: async (likeDislike) => {
          const reaction = likeDislike.dataValues;
          eventEmitter.emit('reaction', reaction);
        }
      }
  });
  likeDislikes.associate = function(models) {
    // associations can be defined here
  };
  return likeDislikes;
};
