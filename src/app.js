import express from 'express';
import pino from 'pino';
import cors from 'cors';
import dbInit from './config/dbinit';
import router from './routes/home';

require('dotenv').config();

const app = express();
const logger = pino();

app.use(cors());
app.options('*', cors());
app.use('/', router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
dbInit();

const port = 5000;
app.listen(port, () => logger.info(`Example app listening on ${port}`));
