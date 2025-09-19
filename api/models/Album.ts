import mongoose from 'mongoose';
import { ref } from 'process';
import { User } from './User';
import { Artist } from './Artist';

const Schema = mongoose.Schema;
const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'artist',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist id does not exits when add Album',
    },
  },
  create_at: {
    type: Date,
    required: true,
  },
  image: String,
});

export const Album = mongoose.model('album', albumSchema);
