import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from '../swagger.json';
import routes from './routes/api/index';
import config from './db/config/envirnoment';

const app = express(); // setup express application

// Access swagger ui documentation on this route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc));

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the default Authors Haven API route',
}));

app.listen(config.port, () => {
  console.log(`Server running at ${config.port}`);
});

export default app;
