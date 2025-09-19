import { configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../features/Artists/artistsSlice';
import { albumsReducer } from '../features/Albums/albumSlice';
import { tracksReducer } from '../features/Tracks/tracksSlice';
import { userReducer } from '../features/Users/userSlice';

export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album: albumsReducer,
    track: tracksReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
