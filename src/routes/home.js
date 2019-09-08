import express from 'express';
import pino from 'pino';
import multer from 'multer';
import Image from '../models/image';
import Imagga from '../middleware/imageTagger';

const fileFilter = (req, file, callback) => {
  file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'
    ? callback(null, true)
    : callback(null, false);
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter,
});
const logger = pino();
const router = new express.Router();

router.get('/img', async (req, res) => {
  const response = await Image.find();
  res.status(200).send(response);
});

router.post('/img', upload.single('file'), async (req, res) => {
  if (req.file) {
    const image = new Image({
      path: req.file.path,
      name: req.file.originalname,
    });
    await image.save();
    const imagga = new Imagga(image);
    const tags = await imagga.tagImage();
    image.tags = tags;
    image.save();
    res.status(200).send('ok');
  } else if (req.body.url) {
    logger.info(req.body.url);
    const image = new Image({
      url: req.body.url,
      name: req.body.name,
    });
    image.save();
    const imagga = new Imagga(image);
    imagga.getFileExtension();
    const pathToImage = await imagga.downloadImageFromUrl();
    image.path = pathToImage;
    logger.info(imagga);
    const tags = await imagga.tagImage();
    image.tags = tags;
    image.save();
    res.status(200).send('ok');
  }
});

export default router;
