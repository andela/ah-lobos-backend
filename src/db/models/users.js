import bcrypt from 'bcrypt';

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
    isVerified: {
        type: DataTypes.BOOLEAN
    },
    hash: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.hash = await bcrypt.hashSync(user.hash, 8);
      },
    },
    instanceMethods: {
      validatePassword: async function(hash) {
        return await bcrypt.compareSync(hash, this.password);
      }
    }
  });
  Users.associate = () => {
  };
  return Users;
};
