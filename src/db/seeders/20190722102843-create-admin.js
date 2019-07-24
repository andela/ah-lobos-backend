import moment from 'moment';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Karangwa',
      lastName: 'Julien',
      username: "Admin",
      email: process.env.ADMIN_EMAIL,
      isVerified: true,
      hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
      role: "admin",
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    }
  ], {});
  },
  down: (queryInterface, Sequelize) => {}
};
