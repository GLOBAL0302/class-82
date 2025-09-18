import { createSlice } from "@reduxjs/toolkit";
import type { IArtist } from "../../vite-env";
import { fetchArtist } from "./artistsThunk";

interface IArtistInitialState{
    artists:IArtist[],
    artistLoading:boolean,
}

const initialState:IArtistInitialState = {
    artists:[],
    artistLoading:false
}

export const artistsSlice = createSlice({
    name:"artist",
    initialState,
    reducers:{
    },
    extraReducers:(builder=>{
        builder
            .addCase(fetchArtist.pending, (state)=>{
                state.artistLoading = true
            })
             .addCase(fetchArtist.fulfilled, (state, {payload})=>{
                state.artistLoading = false
                state.artists = payload
            })
             .addCase(fetchArtist.rejected, (state)=>{
                state.artistLoading = false
            })

    }),
    selectors:{
        selectArtists:(state =>state.artists),
        selectArtistsLoading:(state => state.artistLoading)
    }
})

export const artistReducer = artistsSlice.reducer
export const {selectArtists, selectArtistsLoading} = artistsSlice.selectors