import express from 'express';
import { Error } from 'mongoose';
import { Artist } from '../models/Artist';
import { imagesUpload } from '../multer';

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

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const newArtitst = new Artist({
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
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

export default artistsRouter;
