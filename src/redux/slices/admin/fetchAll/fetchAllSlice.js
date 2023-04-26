import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "../../../thunks/admin/category/categoryThunk";
import { fetchCategoryVariantByCategoryName } from "../../../thunks/admin/variant/variantThunk";
import { fetchBrandByCategoryName } from "../../../thunks/admin/brand/brandThunk";

const initialState = {
  categories: {
    isLoading: false,
    isError: false,
    data: [],
  },
  brands: {
    isLoading: false,
    isError: false,
    data: [],
  },
  categoryVariants: {
    isLoading: false,
    isError: false,
    data: [],
  },
};

const fetchAllSlices = createSlice({
  name: "fetchAll",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.categories.isLoading = true;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.categories.isLoading = false;
        state.categories.isError = false;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categories.isLoading = false;
        state.categories.data = action.payload;
      });

    builder
      .addCase(fetchCategoryVariantByCategoryName.pending, (state) => {
        state.categoryVariants.isLoading = true;
      })
      .addCase(fetchCategoryVariantByCategoryName.rejected, (state) => {
        state.categoryVariants.isError = true;
        state.categoryVariants.isLoading = false;
      })
      .addCase(
        fetchCategoryVariantByCategoryName.fulfilled,
        (state, action) => {
          state.categoryVariants.isLoading = false;
          state.categoryVariants.data = action.payload;
        }
      );

    builder
      .addCase(fetchBrandByCategoryName.pending, (state) => {
        state.brands.isLoading = true;
      })
      .addCase(fetchBrandByCategoryName.rejected, (state) => {
        state.brands.isLoading = false;
        state.brands.isError = false;
      })
      .addCase(fetchBrandByCategoryName.fulfilled, (state, action) => {
        state.brands.isLoading = false;
        state.brands.data = action.payload;
      });
  },
});

export const fetchAllReducer = fetchAllSlices.reducer;
