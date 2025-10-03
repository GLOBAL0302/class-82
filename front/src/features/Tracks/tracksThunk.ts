import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { ITrack, ITrackHistory } from '../../types';
import type { RootState } from '../../app/store';
import { deleteTrack } from './tracksSlice';

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
  async (track) => {
    axiosApi.post('/track_history', { track: track._id });
  },
);

export const fetchTrackHistoryThunk = createAsyncThunk<ITrackHistory[], void, { state: RootState }>(
  'tracks/fetchTrackHistoryThunk',
  async () => {
    const { data } = await axiosApi.get('/track_history');
    return data;
  },
);

export const trackDeleteThunk = createAsyncThunk<void, string>('track/trackDeleteThunk', async (trackId, thunkApi) => {
  await axiosApi.delete(`/tracks/${trackId}`);
  thunkApi.dispatch(deleteTrack(trackId));
});

export const trackToggleThunk = createAsyncThunk<void, string, { state: RootState }>(
  'tracks/trackToggleThunk',
  async (trackId) => {
    await axiosApi.patch(`/tracks/${trackId}/togglePublished`);
  },
);
