import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const trackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'track',
    require: true,
  },
  played_at: {
    type: Date,
    default: Date.now,

  },
});

export const TrackHistory = mongoose.model('trackHistory', trackHistorySchema);
