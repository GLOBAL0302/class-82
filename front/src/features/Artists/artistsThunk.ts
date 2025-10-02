import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { IArtist, IArtistMutation, IGlobalError } from '../../types';
import { isAxiosError } from 'axios';

export const fetchArtist = createAsyncThunk<IArtist[]>('fetch/artists', async () => {
  const { data } = await axiosApi.get('/artists');
  return data;
});

export const postArtistFormThunk = createAsyncThunk<void, IArtistMutation, { rejectValue: IGlobalError }>(
  'post/artist',
  async (artistForm, thunkApi) => {
    const data = new FormData();
    const keys = Object.keys(artistForm) as (keyof IArtistMutation)[];
    keys.forEach((key) => {
      const value = artistForm[key];
      if (value !== null) {
        data.append(key, value);
      }
    });
    try {
      await axiosApi.post('/artists', data);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status == 400) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
