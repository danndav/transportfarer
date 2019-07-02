import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import apiVersion1 from './versioning/v1';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/api/v1', apiVersion1);


app.get('/', (req, res) => res.send({ ok: true, message: 'Welcome to WayFarer', baseurl: '/api/{version}' }).status(200));

app.use((req, res) => res.status(404).json({
  status: 404,
  message: 'Sorry that route/method doesnt exist',

}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'test') {
    console.log(`The Dev server is running on port ${PORT}`);
  } else {
    console.log(`The production server is now running at ${PORT}`);
  }
});
