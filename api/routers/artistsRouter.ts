import express from 'express';
import { Error } from 'mongoose';

const artistsRouter = express.Router();

artistsRouter.get('/', (req, res, next) => {
  try {
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});
