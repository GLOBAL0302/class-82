import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { IAlbum } from '../../types';
import { deleteAlbum } from './albumSlice';
import type { RootState } from '../../app/store';

export const fetchAlbums = createAsyncThunk<IAlbum[], string>('fetch/albums', async (artistId) => {
  const { data } = await axiosApi.get(`/albums?artistId=${artistId}`);
  return data;
});

export const albumDeleteThunk = createAsyncThunk<void, string>('album/albumDeleteThunk', async (albumId, thunkApi) => {
  await axiosApi.delete(`/albums/${albumId}`);
  thunkApi.dispatch(deleteAlbum(albumId));
});

export const albumPublishThunk = createAsyncThunk<void, string, { state: RootState }>(
  'albums/albumPublishThunk',
  async (albumId, thunkApi) => {
    await axiosApi.patch(`/albums/${albumId}/togglePublished`);
    // await thunkApi.dispatch(fetchAlbums());
  },
);
