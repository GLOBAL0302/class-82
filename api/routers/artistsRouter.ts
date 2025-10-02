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

artistsRouter.delete('/:artistId', async (req, res, next) => {
  try {
    const { artistId } = req.params;
    if (!artistId) {
      res.status(400).send({ error: 'ArtistId is required' });
      return;
    }
    const deletedArtist = await Artist.deleteOne({ _id: artistId });
    res.status(200).send({ message: 'Artist is deleted' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

export default artistsRouter;
