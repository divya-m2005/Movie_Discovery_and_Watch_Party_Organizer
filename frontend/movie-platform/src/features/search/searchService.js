// import api from "../../api/api";

// export const searchMovies = async (query) => {
//   const res = await api.get(`/movies/search?query=${query}`);
//   return res.data.results;
// };
import api from "../../api/api";

export const searchMovies = async (query) => {
  const res = await api.get(`/movies/search?query=${query}`);
  return res.data.results;
};