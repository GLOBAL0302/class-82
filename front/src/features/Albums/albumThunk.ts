import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { IAlbum, IAlbumMutation, IGlobalError } from '../../types';
import { deleteAlbum } from './albumSlice';
import type { RootState } from '../../app/store';
import { isAxiosError } from 'axios';

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
  async (albumId) => {
    await axiosApi.patch(`/albums/${albumId}/togglePublished`);
  },
);

export const postAlbumtFormThunk = createAsyncThunk<void, IAlbumMutation, { rejectValue: IGlobalError }>(
  'post/albums',
  async (artistForm, thunkApi) => {
    const data = new FormData();
    const keys = Object.keys(artistForm) as (keyof IAlbumMutation)[];
    keys.forEach((key) => {
      const value = artistForm[key];
      if (value !== null) {
        data.append(key, value);
      }
    });
    try {
      await axiosApi.post('/albums', data);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status == 400) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
