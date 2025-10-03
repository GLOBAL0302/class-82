import express from 'express';
import { Error } from 'mongoose';
import { Artist } from '../models/Artist';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    res.status(200).send(artists);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});

artistsRouter.post('/', auth, permit('admin'), imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const newArtitst = new Artist({
      user: user,
      title: req.body.title,
      description: req.body.description,
      image: req.file ? 'images' + req.file.filename : null,
    });
    const savedArtist = await newArtitst.save();
    res.status(200).send(savedArtist);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});

artistsRouter.delete('/:artistId', auth, permit('admin'), async (req, res, next) => {
  try {
    const { artistId } = req.params;

    if (!artistId) {
      res.status(400).send({ error: 'ArtistId is required' });
      return;
    }
    await Artist.deleteOne({ _id: artistId });
    res.status(200).send({ message: 'Artist is deleted' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

artistsRouter.patch('/:artistId/togglePublished', async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const artist = await Artist.findById({ _id: artistId });
    const updatedArtist = await Artist.findOneAndUpdate(
      { _id: artistId },
      { isPublished: !artist?.isPublished },
      { new: true, runValidators: true },
    );

    res.status(200).send({ message: 'Artist was Published' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

export default artistsRouter;
