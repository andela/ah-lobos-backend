module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
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
      type: Sequelize.STRING,
      defaultValue: 'no image available'
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
    role: {
        type: Sequelize.STRING,
        defaultValue: "normal"
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
