module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    bio: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    favorites: {
      type: Sequelize.STRING
    },
    following: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    isVerified: {
        type: Sequelize.BOOLEAN
    },
    socialId: {
        allowNull: true,
        type: Sequelize.STRING
    },
    provider: {
        allowNull: true,
        type: Sequelize.STRING
    },
    hash: {
      allowNull: true,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Users')
};
