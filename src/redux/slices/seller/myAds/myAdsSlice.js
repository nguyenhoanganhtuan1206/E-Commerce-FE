import { createSlice } from "@reduxjs/toolkit";
import { fetchProductById } from "../../../thunks/seller/product/productThunk";

export const MY_ADS_ALL_PRODUCT = "ALL_PRODUCT";
export const MY_ADS_IN_STOCK = "IN_STOCK";
export const MY_ADS_OUT_OF_STOCK = "OUT_OF_STOCK";
export const MY_ADS_APPROVAL = "APPROVAL";

const initialState = {
  productData: null,
  isLoading: false,
  error: null,
  myAdCurrentSection: MY_ADS_ALL_PRODUCT,
};

const myAdsSlices = createSlice({
  name: "myAds",
  initialState,
  reducers: {
    resetProductData: (state) => {
      state.productData = null;
    },
    switchAdSection: (state, action) => {
      state.myAdCurrentSection = action.payload;
    },
  },
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

export const { resetProductData, switchAdSection } = myAdsSlices.actions;
export const myAdsReducers = myAdsSlices.reducer;
