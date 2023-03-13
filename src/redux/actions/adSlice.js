import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_PRODUCTS } from "../../data/dummy_data";

export const adSlice = createSlice({
  name: "advertise",
  initialState: { pending: false, error: false },
  reducers: {
    createStart: (state) => {
      // Pending is waiting -> Loading...
      state.pending = true;
    },
    createError: (state) => {
      state.pending = false;
      state.error = true;
    },
    createSuccess: (state, action) => {
      state.pending = false;
      state.error = false;

      // In here need to create with axios
      DUMMY_PRODUCTS.push(action.payload);
    },
  },
});

export const { createError, createStart, createSuccess } = adSlice.actions;
export default adSlice.reducer;
