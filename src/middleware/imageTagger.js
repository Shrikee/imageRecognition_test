import request from 'request';
import fs from 'fs';
import pino from 'pino';
import s3 from '../config/awsStorage';

const logger = pino();
export default class Imagga {
  constructor(image) {
    this.apiKey = process.env.API_KEY;
    this.apiSecret = process.env.API_SECRET;
    this.serverAdress = process.env.SERVER_ADDRESS;
    this.image = image;
    this.path = image.path;
    this.url = image.url;
    this.name = image.name;
    this.fileExtension = '';
    this.uploadFolder = 'uploads/';
  }

  tagImage(url) {
    return new Promise(resolve => {
      request
        .get(
          `https://api.imagga.com/v2/tags?limit=5&image_url=${encodeURIComponent(
            process.env.AWS_BUCKET ? url : this.serverAdress + this.path,
          )}`,
          (error, response, body) => {
            resolve(body);
          },
        )
        .auth(this.apiKey, this.apiSecret, true);
    });
  }

  downloadImageFromUrl() {
    this.path = this.uploadFolder + this.name + this.fileExtension;
    const file = fs.createWriteStream(this.path);
    return new Promise(resolve => {
      request(this.url)
        .pipe(file)
        .on('finish', () => {
          resolve(this.path);
        });
    });
  }

  getFileExtension() {
    this.fileExtension = `.${this.url.split('.').pop()}`;
  }

  async uploadToS3(file) {
    logger.info(this.name);
    await s3.putObject(
      {
        Bucket: process.env.AWS_BUCKET,
        Key: this.name,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      },
      (err, data) => {
        if (err) logger.error(err, err.stack);
        else logger.info(data);
      },
    );
    return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${this.name}`;
  }
}
