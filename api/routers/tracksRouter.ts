import express from 'express';
import { Error } from 'mongoose';
import { Track } from '../models/Track';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

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

tracksRouter.post('/', auth, async (req, res, next) => {
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

tracksRouter.delete('/:trackId', auth, permit('admin'), async (req, res, next) => {
  try {
    const { trackId } = req.params;

    if (!trackId) {
      res.status(400).send({ error: 'TrackId is required' });
      return;
    }
    await Track.deleteOne({ _id: trackId });
    res.status(200).send({ message: 'Track is deleted' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

tracksRouter.patch('/:trackId/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const { trackId } = req.params;
    const track = await Track.findById({ _id: trackId });
    const updatedTrack = await Track.findOneAndUpdate(
      { _id: trackId },
      { isPublished: !track?.isPublished },
      { new: true, runValidators: true },
    );

    res.status(200).send({ message: 'Track was Published' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

export default tracksRouter;
