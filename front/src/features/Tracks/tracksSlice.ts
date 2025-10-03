import { createSlice } from '@reduxjs/toolkit';
import type { ITrack, ITrackHistory } from '../../types';
import { fetchTrackHistoryThunk, fetchTracks, trackDeleteThunk } from './tracksThunk';

interface ITrackInitialState {
  tracks: ITrack[];
  tracksFetching: boolean;
  track_history: ITrackHistory[];
  track_historyFetching: boolean;
  trackDeletingLoading: boolean;
}

const initialState: ITrackInitialState = {
  tracks: [],
  tracksFetching: false,
  track_history: [],
  track_historyFetching: false,
  trackDeletingLoading: false,
};

const tracksSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    deleteTrack: (state, { payload }) => {
      state.tracks = state.tracks.filter((item) => item._id !== payload);
    },
  },
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

    builder
      .addCase(trackDeleteThunk.pending, (state) => {
        state.trackDeletingLoading = false;
      })
      .addCase(trackDeleteThunk.fulfilled, (state) => {
        state.trackDeletingLoading = false;
      })
      .addCase(trackDeleteThunk.rejected, (state) => {
        state.trackDeletingLoading = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.tracksFetching,
    selectTrack_history: (state) => state.track_history,
    selectTrackDelLoading: (state) => state.trackDeletingLoading,
  },
});

export const tracksReducer = tracksSlice.reducer;
export const { deleteTrack } = tracksSlice.actions;
export const { selectTracks, selectTracksFetching, selectTrack_history, selectTrackDelLoading } = tracksSlice.selectors;
