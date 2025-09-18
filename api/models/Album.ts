import mongoose from 'mongoose';
import { ref } from 'process';

const Schema = mongoose.Schema;
const albumSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'artist',
    require:true
  },
  create_at: {
    type: Date,
    require: true,
  },
  image: String,
});

export const Album = mongoose.model('album', albumSchema);
