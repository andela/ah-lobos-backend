import moment from 'moment';
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Permissions', [{
        role: 'admin',
        action: 'POST',
        resources: ['Articles', 'Users', 'Comments', 'Followers', 'Permissions', 'Ratings', 'Tags', 'likeDislikes' ],
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
      },
      {
        role: 'admin',
        action: 'PUT',
        resources: ['Articles', 'Users', 'Comments', 'Followers', 'Permissions', 'Ratings', 'Tags', 'likeDislikes' ],
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
      },
      {
        role: 'admin',
        action: 'GET',
        resources: ['Articles', 'Users', 'Comments', 'Followers', 'Permissions', 'Ratings', 'Tags', 'likeDislikes' ],
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
      },
      {
        role: 'admin',
        action: 'DELETE',
        resources: ['Articles', 'Users', 'Comments', 'Followers', 'Permissions', 'Ratings', 'Tags', 'likeDislikes' ],
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
      },

      // Normal user
      {
        role: 'normal',
        action: 'POST',
        resources: ['Articles', 'Users', 'Comments', 'Followers', 'Permissions', 'Ratings', 'Tags', 'likeDislikes' ],
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
      },
      {
        role: 'normal',
        action: 'PUT',
        resources: ['Articles', 'Users', 'Comments', 'Permissions', 'Tags'],
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
      },
      {
        role: 'normal',
        action: 'GET',
        resources: ['Articles', 'Users', 'Comments', 'Followers', 'Permissions', 'Ratings', 'Tags'],
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
      },
      {
        role: 'normal',
        action: 'DELETE',
        resources: ['Articles', 'Users', 'Comments', 'Followers', 'Permissions', 'Ratings', 'Tags'],
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {}
};
