import request from 'request';
import fs from 'fs';

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

  tagImage() {
    return new Promise(resolve => {
      request
        .get(
          `https://api.imagga.com/v2/tags?limit=5&image_url=${encodeURIComponent(
            this.serverAdress + this.path,
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
}
