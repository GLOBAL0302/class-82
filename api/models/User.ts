import mongoose, { HydratedDocument, Model } from 'mongoose';
import { IUserFields } from '../types';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}
type IUserModel = Model<IUserFields, {}, IUserMethods>;

const SALT_WORK_FACTOR = 10;

const schema = mongoose.Schema;

const userSchema = new schema<IUserFields, IUserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
    validate: [
      {
        validator: async function (this: HydratedDocument<IUserFields>, username: string): Promise<boolean> {
          if (!this.isModified('username')) return true;
          const user: HydratedDocument<IUserFields> | null = await User.findOne({ username });
          return !Boolean(user);
        },
        message: 'This user is already registered',
      },
    ],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
    default: 'user',
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

userSchema.methods.checkPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

export const User = mongoose.model<IUserFields, IUserModel>('User', userSchema);
