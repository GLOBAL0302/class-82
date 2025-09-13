import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config';
import artistsRouter from './routers/artistsRouter';
import albumsRouter from './routers/albumsRouter';
import tracksRouter from './routers/tracksRouter';
import usersRouter from './routers/usersRouter';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(PORT, () => {
    console.log(`playlist is running on http://localhost:${PORT}`);
  });

  process.on('exit', async () => {
    mongoose.disconnect();
  });
};

run().catch((error) => console.error(error));
