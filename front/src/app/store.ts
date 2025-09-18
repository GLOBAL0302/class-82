import { configureStore } from "@reduxjs/toolkit";
import { artistReducer } from "../features/Artists/artistsSlice";

export const store = configureStore({
    reducer:{
        artist:artistReducer
    }
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>