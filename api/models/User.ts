import mongoose from 'mongoose';
import { IUserFields } from '../types';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const schema = mongoose.Schema;

const userSchema = new schema<IUserFields>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.set('toJSON', {
  transform: (_doc, ret: Partial<IUserFields>, options) => {
    delete ret.password;
    return ret;
  },
});

export const User = mongoose.model('User', userSchema);
