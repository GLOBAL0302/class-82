import path from 'path';
const rootPath = __dirname;

export const config = {
  db: 'mongodb://localhost/playlist',
  rootPath,
  publicPath: path.join(rootPath, 'public'),
};
