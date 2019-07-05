'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.resolve()
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BlacklistTokens');
  }
};
