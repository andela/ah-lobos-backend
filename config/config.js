const dotenv = require('dotenv');
dotenv.config();

const config = {
    development : {
        username: process.env.DATABASE_USERNAME_DEV,
        password: process.env.SECRET_KEY,
        database: "authorsHavenDb",
        host: "127.0.0.1",
        dialect: "postgres",
        operatorsAliases: false
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "postgres",
        operatorsAliases: false
      },
    production: {
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "postgres",
        operatorsAliases: false
    }
}

module.exports = config;
