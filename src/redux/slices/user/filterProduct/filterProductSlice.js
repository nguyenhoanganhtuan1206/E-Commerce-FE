import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTempInput: "",
  searchCategory: "",
  productsResult: [],
  isLoading: false,
};

const filterProductSlices = createSlice({
  name: "filterProducts",
  initialState,
  reducers: {
    updateSearchInput: (state, action) => {
      state.searchTempInput = action.payload;
    },
    updateSearchCategory: (state, action) => {
      state.searchCategory = action.payload;
    },
  },
});

export const { updateSearchInput, updateSearchCategory } =
  filterProductSlices.actions;
export const filterProductsReducers = filterProductSlices.reducer;
