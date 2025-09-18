import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { ITrack } from '../../types';

export const fetchTracks = createAsyncThunk<ITrack[], string>('fetch/tracks', async (albumId) => {
  const { data } = await axiosApi.get(`/tracks?albumId=${albumId}`);
  return data;
});
