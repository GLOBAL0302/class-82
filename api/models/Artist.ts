import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
});

export const Artist = mongoose.model('artist', artistSchema);
