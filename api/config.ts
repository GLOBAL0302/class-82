import path from 'path';
const rootPath = __dirname;

export const config = {
  db: 'mongodb://localhost:27017/playlist',
  rootPath,
  publicPath: path.join(rootPath, 'public'),
};
