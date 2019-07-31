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
      firstName: "Rafiki",
      lastName: "Gonzalez",
      email: "rafiki@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "mufasa",
      firstName: "Mufasa",
      lastName: "Goma",
      email: "mufasa@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "simba",
      firstName: "Simba",
      lastName: "Samba",
      email: "simba@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "slick",
      firstName: "Slick",
      lastName: "Rick",
      email: "slick@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "nzube",
      firstName: "Nzube",
      lastName: "Macho",
      email: "nzube@gmail.com",
      isVerified: true,
      hash: bcrypt.hashSync('Password12345', 8),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      username: "akpalo",
      firstName: "Akpalo",
      lastName: "Nafisa",
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
