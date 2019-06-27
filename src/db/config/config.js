import envConfig from './envirnoment';

const config = {
  development: {
    username: envConfig.db_username,
    password: envConfig.db_password,
    database: 'authorshavendb',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false
  },
  test: {
    username: envConfig.db_username_test,
    password: envConfig.db_password,
    database: 'ah_db_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false
  },
  production: {
    username: envConfig.db_username_pro,
    password: envConfig.db_password_pro,
    database: 'd11qneg9gqln1',
    host: envConfig.db_host_pro,
    dialect: 'postgres',
    operatorsAliases: false
  }
};

module.exports = config;
