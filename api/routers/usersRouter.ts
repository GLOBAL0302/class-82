import express from 'express';
import { Error } from 'mongoose';
import { User } from '../models/User';
import { randomUUID } from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { config } from '../config';
import { imagesUpload } from '../multer';

const usersRouter = express.Router();

const googleClient = new OAuth2Client(config.google.clientId);

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send({ error: 'Google Login Error' });
    }

    const email = payload.email;
    const id = payload.sub;
    const displayName = payload.name;
    const avatar = payload.picture;

    if (!email) {
      return res.status(400).send({ error: 'Google Login Error' });
    }

    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = new User({
        username: email,
        password: randomUUID(),
        googleId: id,
        displayName,
        avatar,
      });
    }
    user.generateToken();
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? 'images' + req.file.filename : null,
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

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = { message: 'Success' };
    if (!token) res.send(success);
    const user = await User.findOne({ token });
    if (!user) return res.send(success);
    user.token = randomUUID();
    await user.save();
    return res.status(200).send(success);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});
