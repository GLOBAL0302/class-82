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
  track_num: {
    type: Number,
    require: true,
  },
  duration: String,
});


trackSchema.pre('save', async function (next) {
  if (this.isNew) {
    const count = await mongoose.models.track.countDocuments();
    this.track_num = count + 1;
  }
  next();
});

export const Track = mongoose.model('track', trackSchema);
