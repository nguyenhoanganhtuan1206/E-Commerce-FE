import { createSlice } from "@reduxjs/toolkit";
import { fetchProductById } from "../../../thunks/seller/product/productThunk";

const initialState = {
  productData: null,
  isLoading: false,
  error: null,
};

const myAdsSlices = createSlice({
  name: "myAds",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productData = action.payload;
      });
  },
});

export const myAdsReducers = myAdsSlices.reducer;
