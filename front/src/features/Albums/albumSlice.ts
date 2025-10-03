import { createSlice } from '@reduxjs/toolkit';
import type { IAlbum } from '../../types';
import { albumDeleteThunk, fetchAlbums } from './albumThunk';

interface IAlbumInitialState {
  albums: IAlbum[];
  fetchingAlbums: boolean;
  albumsDeleting: boolean;
}

const initialState: IAlbumInitialState = {
  albums: [],
  fetchingAlbums: false,
  albumsDeleting: false,
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    deleteAlbum: (state, { payload }) => {
      state.albums = state.albums.filter((item) => payload !== item._id);
    },
  },
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

    builder
      .addCase(albumDeleteThunk.pending, (state) => {
        state.albumsDeleting = true;
      })
      .addCase(albumDeleteThunk.fulfilled, (state) => {
        state.albumsDeleting = false;
      })
      .addCase(albumDeleteThunk.rejected, (state) => {
        state.albumsDeleting = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumsFetching: (state) => state.fetchingAlbums,
    selectAlbumDelLoading: (state) => state.albumsDeleting,
  },
});

export const albumsReducer = albumSlice.reducer;
export const { deleteAlbum } = albumSlice.actions;
export const { selectAlbums, selectAlbumsFetching, selectAlbumDelLoading } = albumSlice.selectors;
