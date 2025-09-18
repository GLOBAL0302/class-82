import express from 'express';
import { Error } from 'mongoose';
import { Album } from '../models/Album';
import { imagesUpload } from '../multer';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artistId;
    let filter = artistId ? { artist: artistId } : {};
    const albums = await Album.find(filter).populate("artist");
    res.status(200).send(albums);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const newAlbum = new Album({
      title: req.body.title,
      artist: req.body.artist,
      image: req.file ? req.file.filename : null,
      create_at: req.body.create_at,
    });
    const savedAlbum = await newAlbum.save();
    res.status(200).send(savedAlbum);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({ error: 'Album id is required' });
    }
    const albums = await Album.find({ _id: id }).populate('artist');
    res.status(200).send(albums);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});

export default albumsRouter;
