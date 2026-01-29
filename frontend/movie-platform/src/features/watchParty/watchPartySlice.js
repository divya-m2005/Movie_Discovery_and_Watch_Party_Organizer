import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createParty, getParty } from "./watchPartyService";

export const createWatchParty = createAsyncThunk(
  "party/create",
  async (data) => await createParty(data)
);

export const fetchParty = createAsyncThunk(
  "party/get",
  async (code) => await getParty(code)
);

const watchPartySlice = createSlice({
  name: "party",
  initialState: { party: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchParty.fulfilled, (state, action) => {
      state.party = action.payload;
    });
  },
});

export default watchPartySlice.reducer;
