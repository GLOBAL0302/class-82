import { configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../features/Artists/artistsSlice';
import { albumsReducer } from '../features/Albums/albumSlice';

export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album: albumsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
