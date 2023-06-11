import { createSlice } from "@reduxjs/toolkit";
import { fetchProductDetailById } from "../../thunks/seller/product/productThunk";

const commonProductSlice = createSlice({
  name: "commonProduct",
  initialState: {
    isLoading: false,
    error: null,
    productDetailData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetailById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetailById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductDetailById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetailData = action.payload;
      });
  },
});

export const commonProductReducer = commonProductSlice.reducer;
