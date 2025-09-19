import mongoose from 'mongoose';
import { Track } from './Track';
import { User } from './User';

const Schema = mongoose.Schema;
const trackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const track = await User.findById(value);
        return Boolean(track);
      },
      message: 'User does not exits when add track history',
    },
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'track',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const track = await Track.findById(value);
        return Boolean(track);
      },
      message: 'Track id does not exits when add track history',
    },
  },
  played_at: {
    type: Date,
    default: Date.now,
  },
});

export const TrackHistory = mongoose.model('trackHistory', trackHistorySchema);
