import express from 'express';
import { Error } from 'mongoose';
import { Track } from '../models/Track';
import auth from '../middleware/auth';

const tracksRouter = express.Router();

tracksRouter.get('/', auth, async (req, res, next) => {
  try {
    const albumId = req.query.albumId;
    let filter = albumId ? { album: albumId } : {};
    const tracks = await Track.find(filter)
      .populate({
        path: 'album',
        populate: {
          path: 'artist',
        },
      })
      .sort({ track_number: 1 });
    res.status(200).send(tracks);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const newTrack = new Track({
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
    });

    const savedTrack = await newTrack.save();
    res.status(200).send(savedTrack);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});

export default tracksRouter;
