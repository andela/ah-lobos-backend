import 'regenerator-runtime';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import cron from 'node-cron';
import passport from 'passport';
import session from 'express-session';
import swaggerJSDoc from '../swagger.json';
import routes from './routes/api/index';
import config from './db/config/envirnoment';
import deleteBlacklist from './helpers/deleteBlacklistTokens';

const app = express(); // setup express application

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}));
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
// cron to schedule deleting blacklist tokens
cron.schedule('*/59 * * * *', () => {
  deleteBlacklist();
});
// Access swagger ui documentation on this route
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc));

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the default Authors Haven API route',
}));

app.listen(config.port, () => {
  console.log(`Server running at ${config.port}`);
});

export default app;
