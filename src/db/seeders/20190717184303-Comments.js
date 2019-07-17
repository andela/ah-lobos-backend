import moment from 'moment';

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [{
      body: "good",
      slug: "TIA",
      user: 3,
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {

  }
};
