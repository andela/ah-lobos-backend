import envConfig from './envirnoment';

const config = {
  development: {
    username: envConfig.db_username,
    password: envConfig.db_password,
    database: 'authorshavendb',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false,
  },
  test: {
    username: envConfig.db_username_test,
    password: envConfig.db_password_test,
    database: 'ah_db_test',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: envConfig.db_username_pro,
    password: envConfig.db_password_pro,
    database: envConfig.db_database_pro,
    host: envConfig.db_host_pro,
    dialect: 'postgres',
    operatorsAliases: false,
    ssl: true,
    dialectOptions: {
        ssl: {
          "require":true
        }
    }
  }
};

module.exports = config;
