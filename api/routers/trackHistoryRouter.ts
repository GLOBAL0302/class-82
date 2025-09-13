import express from 'express';
import { Error } from 'mongoose';
import { TrackHistory } from '../models/TrackHistory';
import { User } from '../models/User';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      return res.status(401).send({
        error: 'No token Provided',
      });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).send({
        error: 'UNAUTHORIZED',
      });
    }
    const newTrackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
    });

    newTrackHistory.save();
    res.status(200).send({
      message: 'Track history saved successfully',
      newTrackHistory,
    });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({
        error: error.message,
      });
    }
    next(error);
  }
});

export default trackHistoryRouter;
