import moment from 'moment';
import bcrypt from 'bcrypt';
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: "testUser",
      email: "test@gmail.com",
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "Emilen",
      email: "emilereas7e@gmail.com",
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "test",
      email: "user@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {}
};
