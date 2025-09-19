import mongoose, { Schema } from 'mongoose';
import { Album } from './Album';

const schema = mongoose.Schema;

const trackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'album',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'album id does not exits when add Album',
    },
  },
  track_number: {
    type: Number,
    required: true,
  },
  duration: String,
});

export const Track = mongoose.model('track', trackSchema);
