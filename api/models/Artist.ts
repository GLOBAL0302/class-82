import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  image: String,
  description: String,
});

export const Artist = mongoose.model('artist', artistSchema);
