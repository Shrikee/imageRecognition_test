import mongoose from 'mongoose';
import pino from 'pino';

const logger = pino();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const dbInit = () => {
  mongoose
    .connect(process.env.MONGO_ADRESS, { useNewUrlParser: true })
    .then(() => logger.info('Connected to db...'))
    .catch(err => logger.error(`Could not connect to db...${err}`));
};

export default dbInit;
