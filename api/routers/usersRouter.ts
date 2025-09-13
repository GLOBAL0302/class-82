import express from 'express';
import { Error } from 'mongoose';
import { User } from '../models/User';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});

export default usersRouter;
