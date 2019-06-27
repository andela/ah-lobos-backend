export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        message: 'Please enter your username'
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: {
        args: false,
        message: 'Please enter your email'
      }
    },
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    favorites: [{
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    }],
    following: [{
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    }],
    hash: DataTypes.STRING
  }, {});
  Users.associate = () => {
  };
  return Users;
};
