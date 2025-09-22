import express from 'express';
import { Error } from 'mongoose';
import { TrackHistory } from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const track_histories = await TrackHistory.find({ user })
      .populate({
        path: 'track',
        populate: {
          path: 'album',
          populate: {
            path: 'artist',
          },
        },
      })
      .sort({ played_at: -1 });
    res.status(200).send(track_histories);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send({ error: e });
    }
    next(e);
  }
});

trackHistoryRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    if (!user) {
      return res.status(401).send({
        error: 'UNAUTHORIZED',
      });
    }
    const newTrackHistory = new TrackHistory({
      user: user,
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
