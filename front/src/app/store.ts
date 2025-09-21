import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../features/Artists/artistsSlice';
import { albumsReducer } from '../features/Albums/albumSlice';
import { tracksReducer } from '../features/Tracks/tracksSlice';
import { userReducer } from '../features/Users/userSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';

// export const store = configureStore({
//   reducer: {
//     artist: artistReducer,
//     album: albumsReducer,
//     track: tracksReducer,
//     user: userReducer,
//   },
// });

const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artist: artistReducer,
  album: albumsReducer,
  track: tracksReducer,
  user: persistReducer(usersPersistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
