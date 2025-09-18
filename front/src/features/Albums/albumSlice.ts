import { createSlice } from '@reduxjs/toolkit';
import type { IAlbum } from '../../types';
import { fetchAlbums } from './albumThunk';

interface IAlbumInitialState {
  albums: IAlbum[];
  fetchingAlbums: boolean;
}

const initialState: IAlbumInitialState = {
  albums: [],
  fetchingAlbums: false,
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.fetchingAlbums = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
        state.fetchingAlbums = false;
        state.albums = payload;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.fetchingAlbums = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumsFetching: (state) => state.fetchingAlbums,
  },
});

export const albumsReducer = albumSlice.reducer;
export const { selectAlbums, selectAlbumsFetching } = albumSlice.selectors;
