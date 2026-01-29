import api from "../../api/api";

export const getRatings = async (movieId) => {
  const res = await api.get(`/ratings/${movieId}`);
  return res.data;
};

export const rateMovie = async (movieId, rating) => {
  const res = await api.post(`/ratings/${movieId}`, rating);
  return res.data;
};
