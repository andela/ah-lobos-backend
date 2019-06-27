import { config as _config } from 'dotenv';

_config();


const config = {
  development: {
    username: process.env.DATABASE_USERNAME_DEV,
    password: process.env.SECRET_KEY,
    database: 'authorsHavenDb',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false
  },
  production: {
    username: process.env.HEROKU_DATABASE_USERNAME,
    password: process.env.HEROKU_SECRET_KEY,
    database: 'd11qneg9gqln1',
    host: process.env.HEROKU_HOST,
    dialect: 'postgres',
    operatorsAliases: false
  }
};

export default config;
