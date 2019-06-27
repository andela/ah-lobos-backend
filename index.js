import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express(); // setup express application


app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the default API route',
}));

app.listen(port, () => {
  console.log(`App started on ${port}`);
});
