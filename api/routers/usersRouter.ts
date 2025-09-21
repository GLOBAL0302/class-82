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

    newUser.generateToken();
    const savedUser = await newUser.save();
    res.status(200).send({ message: 'user Created', user: savedUser });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

export default usersRouter;

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!req.body.username) {
      return res.status(400).send({ error: 'Please input username' });
    }
    if (!req.body.password) {
      return res.status(400).send({ error: 'Please input password' });
    }
    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send({
        error: 'Password does not match',
      });
    }

    user.generateToken();
    user.save();
    return res.status(200).send({
      message: 'Password matched successfully',
      user,
    });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
    }
    next(error);
  }
});
