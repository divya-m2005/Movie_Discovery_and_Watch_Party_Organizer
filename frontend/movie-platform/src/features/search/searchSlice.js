// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { searchMovies } from "./searchService";

// export const fetchSearch = createAsyncThunk(
//   "search/fetch",
//   async (query) => await searchMovies(query)
// );

// const searchSlice = createSlice({
//   name: "search",
//   initialState: { results: [] },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchSearch.fulfilled, (state, action) => {
//       state.results = action.payload;
//     });
//   },
// });

// export default searchSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMovies } from "./searchService";

export const fetchSearch = createAsyncThunk(
  "search/fetch",
  async (query) => await searchMovies(query)
);

// const searchSlice = createSlice({
//   name: "search",
//   initialState: { results: [] },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchSearch.fulfilled, (state, action) => {
//       state.results = action.payload;
//     });
//   },
// });
const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],   // ✅ MUST exist
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.results = action.payload ?? []; // ✅ safety
    });
  },
});
export default searchSlice.reducer;