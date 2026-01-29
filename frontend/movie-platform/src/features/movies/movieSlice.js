// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getTrendingMovies, getMovieById } from "./movieService";

// export const fetchTrending = createAsyncThunk(
//   "movies/trending",
//   async () => await getTrendingMovies()
// );

// export const fetchMovie = createAsyncThunk(
//   "movies/detail",
//   async (id) => await getMovieById(id)
// );


// const movieSlice = createSlice({
//   name: "movies",
//   initialState: { list: [], movie: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTrending.fulfilled, (state, action) => {
//         state.list = action.payload;
//       })
//       .addCase(fetchMovie.fulfilled, (state, action) => {
//         state.movie = action.payload;
//       });
//   },
// });

// export default movieSlice.reducer;


// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import { getTrendingMovies } from "./movieService";

// // export const fetchTrendingMovies = createAsyncThunk(
// //   "movies/trending",
// //   async () => await getTrendingMovies()
// // );

// // const movieSlice = createSlice({
// //   name: "movies",
// //   initialState: {
// //     trending: [],
// //     loading: false,
// //   },
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchTrendingMovies.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
// //         state.trending = action.payload;
// //         state.loading = false;
// //       });
// //   },
// // });

// // export default movieSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTrendingMovies,
  getMovieById,
  getMovieCredits,
  getSimilarMovies,
} from "./movieService";

export const fetchTrending = createAsyncThunk(
  "movies/trending",
  async () => await getTrendingMovies()
);

export const fetchMovie = createAsyncThunk(
  "movies/detail",
  async (id) => await getMovieById(id)
);

// ✅ ADD
export const fetchCredits = createAsyncThunk(
  "movies/credits",
  async (id) => await getMovieCredits(id)
);

export const fetchSimilar = createAsyncThunk(
  "movies/similar",
  async (id) => await getSimilarMovies(id)
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
  list: [],
  movie: null,
  cast: [],
  similar: [],
  loading: false,   // ✅ ADD THIS
},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.movie = action.payload;
      })
      // ✅ ADD
      .addCase(fetchCredits.fulfilled, (state, action) => {
        state.cast = action.payload;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.similar = action.payload;
      });
  },
});

export default movieSlice.reducer;