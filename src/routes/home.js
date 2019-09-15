import express from 'express';
import pino from 'pino';
import Image from '../models/image';
import Imagga from '../middleware/imageTagger';
import upload from '../middleware/multer';

const logger = pino();
const router = new express.Router();

router.get('/deleteall', async (req, res) => {
  await Image.deleteMany();
  res.status(200).send('deleted');
});

router.get('/img', async (req, res) => {
  const response = await Image.find();
  res.status(200).send(response);
});

router.post('/img', upload.single('file'), async (req, res) => {
  if (process.env.AWS_BUCKET) {
    if (req.file) {
      const image = new Image({
        name: req.file.originalname,
      });
      const imagga = new Imagga(image);
      const url = await imagga.uploadToS3(req.file);
      image.url = url;
      const tags = await imagga.tagImage(url);
      image.tags = tags;
      await image.save();
      res.status(200).send('ok');
    } else if (req.body.url || req.body.name) {
    }
  } else if (req.file) {
    logger.info(req.file);
    const image = new Image({
      path: req.file.path,
      name: req.file.originalname,
    });
    await image.save();
    const imagga = new Imagga(image);
    const tags = await imagga.tagImage();
    image.tags = tags;
    await image.save();
    res.status(200).send('ok');
  } else if (req.body.url) {
    logger.info(req.body.url);
    const image = new Image({
      url: req.body.url,
      name: req.body.name,
    });
    await image.save();
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
