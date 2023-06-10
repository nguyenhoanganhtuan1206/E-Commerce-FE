import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 1,
};

const cartSlices = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    toggleIncreaseQuantity: (state) => {
      state.quantity += 1;
    },
    toggleDecreaseQuantity: (state) => {
      state.quantity -= 1;
    },
  },
});

export const { toggleDecreaseQuantity, toggleIncreaseQuantity, setQuantity } =
  cartSlices.actions;
export const cartReducers = cartSlices.reducer;
