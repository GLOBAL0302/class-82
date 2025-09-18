import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import type { IArtist } from "../../types";

export const fetchArtist = createAsyncThunk<IArtist[]>(
  "fetch/artists",
  async () => {
    const { data } = await axiosApi.get("/artists");
    return data;
  }
);
