import moment from 'moment';

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('likeDislikes', [{
      userId: 1,
      slug: 'TIA',
      like: true,
      dislike: false,
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      userId: 1,
      slug: 'TIA2',
      like: false,
      dislike: false,
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    }], {});
  },

  down: (queryInterface, Sequelize) => {}
};
