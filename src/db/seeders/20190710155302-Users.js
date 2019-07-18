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
    },
    {
      username: "rafiki",
      email: "rafiki@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "mufasa",
      email: "mufasa@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "simba",
      email: "simba@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "slick",
      email: "slick@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "nzube",
      email: "nzube@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "akpalo",
      email: "akpalo@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {}
};
