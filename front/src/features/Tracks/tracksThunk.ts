import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { ITrack, ITrackHistory } from '../../types';
import type { RootState } from '../../app/store';

export const fetchTracks = createAsyncThunk<ITrack[], string, { state: RootState }>(
  'fetch/tracks',
  async (albumId, thunkApi) => {
    const token = thunkApi.getState().user.user?.token;

    const { data } = await axiosApi.get(`/tracks?albumId=${albumId}`, { headers: { Authorization: token } });
    return data;
  },
);

export const addTrackToHistory = createAsyncThunk<void, ITrack, { state: RootState }>(
  'track/addTrackToHistory',
  async (track, thunkApi) => {
    const token = thunkApi.getState().user.user?.token;
    console.log(track);
    axiosApi.post('/track_history', { track: track._id });
  },
);

export const fetchTrackHistoryThunk = createAsyncThunk<ITrackHistory[], void, { state: RootState }>(
  'tracks/fetchTrackHistoryThunk',
  async (_, thunkApi) => {
    const token = thunkApi.getState().user.user?.token;
    const { data } = await axiosApi.get('/track_history');
    return data;
  },
);
