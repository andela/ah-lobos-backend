import express from 'express';
import http from 'http';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/api/index';

const hostname = '127.0.0.1';
const port = 7000;
const app = express(); // setup express application
const server = http.createServer(app);

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the default API route',
}));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default server;
