import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/movieSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";
import ratingReducer from "../features/ratings/ratingSlice";
import watchPartyReducer from "../features/watchParty/watchPartySlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    watchlist: watchlistReducer,
    ratings: ratingReducer,
    watchParty: watchPartyReducer,
    search: searchReducer, // ✅ add this
  },
});
