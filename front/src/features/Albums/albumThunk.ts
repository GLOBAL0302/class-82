import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { IAlbum } from '../../types';

export const fetchAlbums = createAsyncThunk<IAlbum[], string>('fetch/albums', async (artistId) => {
  const { data } = await axiosApi.get(`/albums?artistId=${artistId}`);
  return data;
});
