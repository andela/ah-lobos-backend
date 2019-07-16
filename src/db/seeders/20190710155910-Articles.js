import moment from 'moment';

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [{
      title: 'TIA',
      body: 'This is Andela',
      description: 'From the heart and deep on the soul of young African software engineers',
      authorId: 1,
      slug: 'TIA',
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },{
      title: 'Delete this',
      body: 'This is Andela',
      description: 'From the heart and deep on the soul of young African software engineers',
      authorId: 1,
      slug: 'dropTIA',
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },{
      title: 'like dislike',
      body: 'This is Andela',
      description: 'From the heart and deep on the soul of young African software engineers',
      authorId: 1,
      slug: 'like-africa',
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    }], {});
  },
  down: (queryInterface, Sequelize) => {}
};
