import api from "../../api/api";

export const createParty = async (data) => {
  const res = await api.post("/watch-party/create", data);
  return res.data;
};

export const getParty = async (code) => {
  const res = await api.get(`/watch-party/${code}`);
  return res.data;
};


// RSVP / mark user as interested
export const rsvpParty = async (code) => {
const res = await api.post(`/watch-party/${code}/rsvp`);
return res.data;
};
