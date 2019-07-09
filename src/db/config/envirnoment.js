import dotenv from 'dotenv';
import { eventNames } from 'cluster';

dotenv.config();

let envConfig = {};
envConfig.db_username = process.env.DATABASE_USERNAME_DEV;
envConfig.db_password = process.env.DATABASE_PASSWORD_DEV;
envConfig.port = process.env.PORT || 7000;

envConfig.db_username_test = process.env.DATABASE_USERNAME_TEST;
envConfig.db_password_test = process.env.DATABASE_PASSWORD_TEST;

envConfig.db_username_pro = process.env.HEROKU_DATABASE_USERNAME;
envConfig.db_password_pro = process.env.HEROKU_SECRET_KEY;
envConfig.db_host_pro = process.env.HEROKU_HOST;
envConfig.db_database_pro = process.env.HEROKU_DATABASE;

envConfig.send_grid_key = process.env.SendGridApiKey;
envConfig.host = process.env.HOST;
envConfig.token = process.env.SECRET_JWT_KEY;
envConfig.email = process.env.EMAIL;
envConfig.password = process.env.PASSWORD;
envConfig.facebook_app_id = process.env.FACEBOOK_APP_ID;
envConfig.facebook_app_secret = process.env.FACEBOOK_APP_SECRET;
envConfig.secret = process.env.SECRET;
envConfig.google_app_id = process.env.GMAIL_APP_ID;
envConfig.google_app_secret = process.env.GMAIL_APP_SECRET;
envConfig.twitter_app_id = process.env.TWITTER_APP_ID;
envConfig.twitter_app_secret = process.env.TWITTER_APP_SECRET;
envConfig.twitter_access_token = process.env.TWITTER_ACCESS_TOKEN;
envConfig.twitter_access_secret = process.env.TWITTER_ACCESS_SECRET;
envConfig.twitter_callback = process.env.CALLBACK;

export default envConfig;
