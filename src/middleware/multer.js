import pino from 'pino';
import multer from 'multer';
// TODO: why this module is loaded before app.js dependencies are resolved

require('dotenv').config();

const logger = pino();

const fileFilter = (req, file, callback) => {
    file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'
        ? callback(null, true)
        : callback(null, false);
};

let storage = null;

if (process.env.AWS_BUCKET) {
    storage = multer.memoryStorage();
    logger.info('multer aws');
} else {
    logger.info('multer local storage');
    storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './uploads');
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        },
    });
}

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter,
});

export default upload;
