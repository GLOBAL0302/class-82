import { configDotenv } from 'dotenv';
import path from 'path';
const rootPath = __dirname;

configDotenv();
export const config = {
  db: 'mongodb://localhost/playlist',
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};
