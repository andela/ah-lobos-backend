import dotenv from 'dotenv';

dotenv.config();

let envConfig = {};
envConfig.db_username = process.env.DATABASE_USERNAME_DEV;
envConfig.db_password = process.env.DATABASE_PASSWORD;

envConfig.db_username_test = process.env.DATABASE_USERNAME_TEST;
envConfig.db_password_test = process.env.DATABASE_PASSWORD;

envConfig.db_username_pro = process.env.HEROKU_DATABASE_USERNAME;
envConfig.db_password_pro = process.env.HEROKU_SECRET_KEY;
envConfig.db_host_pro = process.env.HEROKU_HOST;

export default envConfig;
