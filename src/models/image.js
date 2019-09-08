import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  name: { type: String },
  path: { type: String },
  url: { type: String },
  tags: { type: String },
});

const Image = new mongoose.Model('Image', imageSchema);

export default Image;
