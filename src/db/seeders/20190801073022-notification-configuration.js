import moment from 'moment';
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const userConfig = {
      inApp: {
        articles: {
          show: true,
          on: ['publish', 'comment', 'like']
        }
      },
      email: {
        articles: {
          show: true,
          on: ['publish']
        }
      }
    }
    return queryInterface.bulkInsert('NotificationConfigs', [
      {
      userId: 4,
        config: JSON.stringify(userConfig),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
      },
      {
      userId: 5,
        config: JSON.stringify(userConfig),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
      },
      {
      userId: 6,
        config: JSON.stringify(userConfig),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
      },
      {
      userId: 7,
        config: JSON.stringify(userConfig),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
      },
      {
      userId: 8,
        config: JSON.stringify(userConfig),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
      },
      {
      userId: 9,
        config: JSON.stringify(userConfig),
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NotificationConfigs', null, {});
  }
};
