import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 1,
  userIdModalChangeAddress: null,
  isShowModalChangeAddress: false,
  userInfoDelivery: null,
};

const cartSlices = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    toggleIncreaseQuantity: (state) => {
      state.quantity += 1;
    },
    toggleDecreaseQuantity: (state) => {
      state.quantity -= 1;
    },
    toggleShowModalChangeAddress: (state, action) => {
      state.isShowModalChangeAddress = !state.isShowModalChangeAddress;

      if (state.isShowModalChangeAddress) {
        state.userIdModalChangeAddress = action.payload;
      }
    },
    updateProfileUserDelivery: (state, action) => {
      state.userInfoDelivery = action.payload;
    },
  },
});

export const {
  toggleDecreaseQuantity,
  toggleIncreaseQuantity,
  setCartQuantity,
  toggleShowModalChangeAddress,
  updateProfileUserDelivery
} = cartSlices.actions;
export const cartReducers = cartSlices.reducer;
