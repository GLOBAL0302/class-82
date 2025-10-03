import { createSlice } from '@reduxjs/toolkit';
import type { IArtist } from '../../vite-env';
import { artistDeleteThunk, fetchArtist, postArtistFormThunk } from './artistsThunk';
import type { IGlobalError } from '../../types';

interface IArtistInitialState {
  artists: IArtist[];
  artistLoading: boolean;
  postingArtistLoading: boolean;
  postingArtistError: IGlobalError | null;
  deletingArtist: boolean;
}

const initialState: IArtistInitialState = {
  artists: [],
  artistLoading: false,
  postingArtistLoading: false,
  postingArtistError: null,
  deletingArtist: false,
};

export const artistsSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtist.pending, (state) => {
        state.artistLoading = true;
      })
      .addCase(fetchArtist.fulfilled, (state, { payload }) => {
        state.artistLoading = false;
        state.artists = payload;
      })
      .addCase(fetchArtist.rejected, (state) => {
        state.artistLoading = false;
      });

    builder
      .addCase(postArtistFormThunk.pending, (state) => {
        state.postingArtistLoading = true;
      })
      .addCase(postArtistFormThunk.fulfilled, (state) => {
        state.postingArtistLoading = false;
      })
      .addCase(postArtistFormThunk.rejected, (state, { payload }) => {
        state.postingArtistError = payload || null;
      });

    builder
      .addCase(artistDeleteThunk.pending, (state) => {
        state.deletingArtist = true;
      })
      .addCase(artistDeleteThunk.fulfilled, (state) => {
        state.deletingArtist = false;
      })
      .addCase(artistDeleteThunk.rejected, (state) => {
        state.deletingArtist = false;
      });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsLoading: (state) => state.artistLoading,
    selectArtistPostLoading: (state) => state.postingArtistLoading,
  },
});

export const artistReducer = artistsSlice.reducer;
export const { selectArtists, selectArtistsLoading, selectArtistPostLoading } = artistsSlice.selectors;
