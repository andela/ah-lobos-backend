import moment from 'moment';
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Followers', [{
      follower: 4,
      followee: 5,
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      follower: 4,
      followee: 6,
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      follower: 4,
      followee: 7,
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      follower: 5,
      followee: 4,
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      follower: 6,
      followee: 4,
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },
    {
      follower: 7,
      followee: 4,
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Followers', null, {});
  }
};
