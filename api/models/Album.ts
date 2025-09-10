import mongoose from 'mongoose';
import { ref } from 'process';

const Schema = mongoose.Schema;
const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'artist',
  },
  create_at: {
    type: String,
    default: () => new Date().toISOString(),
  },
  image: String,
});

export const Album = mongoose.model('album', albumSchema);
