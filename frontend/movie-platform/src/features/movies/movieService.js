// import api from "../../api/api";

// // export const getTrendingMovies = async () => {
// //   const res = await api.get("/movies/trending");
// //   return res.data;
// // };
// export const getTrendingMovies = async () => {
//   const res = await api.get("/movies/trending");
//   return res.data.results; // 🔥 MUST BE results
// };


// export const getMovieById = async (id) => {
//   const res = await api.get(`/movies/${id}`);
//   return res.data;
// };

import api from "../../api/api";

export const getTrendingMovies = async () => {
  const res = await api.get("/movies/trending");
  return res.data.results;
};

export const getMovieById = async (id) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};

// ✅ ADD THESE
export const getMovieCredits = async (id) => {
  const res = await api.get(`/movies/${id}/credits`);
  return res.data.cast;
};

export const getSimilarMovies = async (id) => {
  const res = await api.get(`/movies/${id}/similar`);
  return res.data.results;
};