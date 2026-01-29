import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWatchlist, addToWatchlist } from "./watchlistService";

export const fetchWatchlist = createAsyncThunk(
  "watchlist/get",
  async () => await getWatchlist()
);

export const addWatchlist = createAsyncThunk(
  "watchlist/add",
  async (movie) => await addToWatchlist(movie) // pass full movie object
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addWatchlist.fulfilled, (state, action) => {
        // store full movie object
        state.items.push(action.payload);
      });
  },
});

export default watchlistSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getWatchlist, addToWatchlist } from "./watchlistService";

// export const fetchWatchlist = createAsyncThunk(
//   "watchlist/get",
//   async () => await getWatchlist()
// );

// export const addWatchlist = createAsyncThunk(
//   "watchlist/add",
//   async (movieId) => await addToWatchlist(movieId)
// );

// // const watchlistSlice = createSlice({
// //   name: "watchlist",
// //   initialState: { items: [] },
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder.addCase(fetchWatchlist.fulfilled, (state, action) => {
// //       state.items = action.payload;
// //     });
// //   },
// // });
// const watchlistSlice = createSlice({
//   name: "watchlist",
//   initialState: { items: [] },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWatchlist.fulfilled, (state, action) => {
//         state.items = action.payload;
//       })
//       // ✅ handle adding to watchlist
//       .addCase(addWatchlist.fulfilled, (state, action) => {
//         // push the new movie to the items array
//         state.items.push(action.payload);
//       });
//   },
// });

// // export default watchlistSlice.reducer;

// export default watchlistSlice.reducer;
