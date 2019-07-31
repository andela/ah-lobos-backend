import moment from 'moment';
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notifications', [
      {
        userId: 4,
        message: "Notification message",
        preference: "inApp",
        url: "link",
        status: "unseen",
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
      },
      {
        userId: 4,
        message: "Notification message",
        preference: "inApp",
        url: "link",
        status: "unseen",
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
      },
      {
        userId: 4,
        message: "Notification message",
        preference: "inApp",
        url: "link",
        status: "unseen",
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notifications', null, {});
  }
};
