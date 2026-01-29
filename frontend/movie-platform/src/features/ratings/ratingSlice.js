import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRatings } from "./ratingService";

export const fetchRatings = createAsyncThunk(
  "ratings/get",
  async (id) => await getRatings(id)
);

const ratingSlice = createSlice({
  name: "ratings",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRatings.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default ratingSlice.reducer;
