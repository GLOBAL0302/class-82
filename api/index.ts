import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  process.on('exit', async () => {
    await mongoose.disconnect();
  });
};

run().catch((error) => console.error(error));
