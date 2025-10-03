import express from 'express';
import { Error } from 'mongoose';
import { Album } from '../models/Album';
import { imagesUpload } from '../multer';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artistId;
    let filter = artistId ? { artist: artistId } : {};
    const albums = await Album.find(filter).populate('artist');
    res.status(200).send(albums);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const newAlbum = await Album.create({
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

albumsRouter.get('/:id', permit('admin'), async (req, res, next) => {
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

albumsRouter.delete('/:albumId', auth, permit('admin'), async (req, res, next) => {
  try {
    const { albumId } = req.params;

    if (!albumId) {
      res.status(400).send({ error: 'AlbumId is required' });
      return;
    }
    await Album.deleteOne({ _id: albumId });
    res.status(200).send({ message: 'Album is deleted' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

albumsRouter.patch('/:albumId/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findById({ _id: albumId });
    const updatedAlbum = await Album.findOneAndUpdate(
      { _id: albumId },
      { isPublished: !album?.isPublished },
      { new: true, runValidators: true },
    );

    res.status(200).send({ message: 'Album was Published' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

export default albumsRouter;
