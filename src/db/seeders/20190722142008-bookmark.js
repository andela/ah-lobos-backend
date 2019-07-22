import moment from 'moment';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Bookmarks', [{
       userId: 1,
       slug: 'bookmark-it',
       createdAt: moment.utc().format(),
       updatedAt: moment.utc().format()
   }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookmarks', null, {});
  }
};
