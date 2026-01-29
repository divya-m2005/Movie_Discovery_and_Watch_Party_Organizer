import api from "../../api/api";

// fetch watchlist
export const getWatchlist = async () => {
  const res = await api.get("/watchlist");
  return res.data;
};

// // add full movie to watchlist
// export const addToWatchlist = async (movie) => {
//   const res = await api.post("/watchlist", movie); // send full movie object
//   return res.data;
// };
export const addToWatchlist = async (movieId) => {
  const res = await api.post(`/watchlist?movieId=${movieId}`);
  return res.data;
};


// import api from "../../api/api";

// export const getWatchlist = async () => {
//   const res = await api.get("/watchlist");
//   return res.data;
// };

// export const addToWatchlist = async (movieId) => {
//   const res = await api.post("/watchlist", { movieId });
//   return res.data;
// };
