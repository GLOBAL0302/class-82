import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';

export const fetchAlbums = createAsyncThunk('fetch/albums', async () => {
  const { data } = await axiosApi.get('/albums');
  return data;
});
