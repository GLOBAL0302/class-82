import mongoose, { Schema } from 'mongoose';

const schema = mongoose.Schema;

const trackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'album',
  },
  duration: String,
});

export const Track = mongoose.model('track', trackSchema);
