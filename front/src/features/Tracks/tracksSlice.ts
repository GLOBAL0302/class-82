import { createSlice } from '@reduxjs/toolkit';
import type { ITrack } from '../../types';
import { fetchTracks } from './tracksThunk';

interface ITrackInitialState {
  tracks: ITrack[];
  tracksFetching: boolean;
}

const initialState: ITrackInitialState = {
  tracks: [],
  tracksFetching: false,
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
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.tracksFetching,
  },
});

export const tracksReducer = tracksSlice.reducer;
export const { selectTracks, selectTracksFetching } = tracksSlice.selectors;
