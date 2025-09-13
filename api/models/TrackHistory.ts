import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const trackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'track',
    required: true,
  },
  played_at: {
    type: Date,
    default: Date.now,
  },
});

export const TrackHistory = mongoose.model('trackHistory', trackHistorySchema);
