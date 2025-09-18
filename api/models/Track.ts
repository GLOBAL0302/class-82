import mongoose, { Schema } from 'mongoose';

const schema = mongoose.Schema;

const trackSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'album',
    require:true
  },
  track_number: {
    type: Number,
    require: true,
  },
  duration: String,
});


export const Track = mongoose.model('track', trackSchema);
