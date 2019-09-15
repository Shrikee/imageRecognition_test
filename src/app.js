import express from 'express';
import pino from 'pino';
import cors from 'cors';
import dbInit from './config/dbinit';
import router from './routes/home';

const logger = pino();
const app = express();

app.use(cors());
app.options('*', cors());
app.use('/', router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
dbInit();

const port = 5000;
app.listen(process.env.PORT || port, () =>
  logger.info(`Example app listening on ${port || process.env.PORT}`),
);
