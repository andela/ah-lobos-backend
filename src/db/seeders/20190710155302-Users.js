import moment from 'moment';
import bcrypt from 'bcrypt';
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: "Emile",
      lastName: "Nsengimana",
      username: "testUser",
      email: "test@gmail.com",
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      firstName: "Emile",
      lastName: "Nsengimana",
      username: "Emilen",
      email: "emilereas7@gmail.com",
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      firstName: "Emile",
      lastName: "Nsengimana",
      username: "test",
      email: "user@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "rafiki",
      firstName: "mufasa",
      lastName: "mufasa",
      email: "rafiki@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "mufasa",
      firstName: "mufasa",
      lastName: "mufasa",
      email: "mufasa@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "simba",
      firstName: "mufasa",
      lastName: "mufasa",
      email: "simba@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "slick",
      firstName: "mufasa",
      lastName: "mufasa",
      email: "slick@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "nzube",
      firstName: "mufasa",
      lastName: "mufasa",
      email: "nzube@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "akpalo",
      firstName: "mufasa",
      lastName: "mufasa",
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
