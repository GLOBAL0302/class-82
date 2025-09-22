import { createSlice } from '@reduxjs/toolkit';
import type { ITrack, ITrackHistory } from '../../types';
import { fetchTrackHistoryThunk, fetchTracks } from './tracksThunk';

interface ITrackInitialState {
  tracks: ITrack[];
  tracksFetching: boolean;
  track_history: ITrackHistory[];
  track_historyFetching: boolean;
}

const initialState: ITrackInitialState = {
  tracks: [],
  tracksFetching: false,
  track_history: [],
  track_historyFetching: false,
};

const tracksSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.tracksFetching = false;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload }) => {
        state.tracksFetching = true;
        state.tracks = payload;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.tracksFetching = false;
      });

    builder
      .addCase(fetchTrackHistoryThunk.pending, (state) => {
        state.tracksFetching = false;
      })
      .addCase(fetchTrackHistoryThunk.fulfilled, (state, { payload }) => {
        state.track_history = payload;
      })
      .addCase(fetchTrackHistoryThunk.rejected, (state) => {
        state.tracksFetching = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.tracksFetching,
    selectTrack_history: (state) => state.track_history,
  },
});

export const tracksReducer = tracksSlice.reducer;
export const { selectTracks, selectTracksFetching, selectTrack_history } = tracksSlice.selectors;
