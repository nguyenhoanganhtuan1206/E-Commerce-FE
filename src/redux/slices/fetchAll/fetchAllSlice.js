import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "../../thunks/admin/category/categoryThunk";
import { fetchCategoryVariants } from "../../thunks/admin/variant/variantThunk";
import { fetchBrands } from "../../thunks/admin/brand/brandThunk";
import { fetchProductStyles } from "../../thunks/admin/product-style/productStyleThunk";
import {
  fetchProducts,
  fetchProductsWithDifferentSeller,
} from "../../thunks/products/productThunks";
import { fetchCategories } from "../../thunks/categories/categoriesThunk";
import { fetchProductByName } from "../../thunks/user/filterProducts/filterProductThunk";

const initialState = {
  products: {
    isLoading: false,
    isError: false,
    data: [],
  },
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
  productStyles: {
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
      .addCase(fetchCategoryVariants.pending, (state) => {
        state.categoryVariants.isLoading = true;
      })
      .addCase(fetchCategoryVariants.rejected, (state) => {
        state.categoryVariants.isError = true;
        state.categoryVariants.isLoading = false;
      })
      .addCase(fetchCategoryVariants.fulfilled, (state, action) => {
        state.categoryVariants.isLoading = false;
        state.categoryVariants.data = action.payload;
      });

    builder
      .addCase(fetchBrands.pending, (state) => {
        state.brands.isLoading = true;
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.brands.isLoading = false;
        state.brands.isError = false;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands.isLoading = false;
        state.brands.data = action.payload;
      });

    builder
      .addCase(fetchProductStyles.pending, (state) => {
        state.productStyles.isLoading = true;
      })
      .addCase(fetchProductStyles.rejected, (state) => {
        state.productStyles.isLoading = false;
        state.productStyles.isError = false;
      })
      .addCase(fetchProductStyles.fulfilled, (state, action) => {
        state.productStyles.isLoading = false;
        state.productStyles.data = action.payload;
      });

    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products.isLoading = true;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.products.isLoading = false;
        state.products.isError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products.isLoading = false;
        state.products.data = action.payload;
      });

    builder
      .addCase(fetchProductsWithDifferentSeller.pending, (state) => {
        state.products.isLoading = true;
      })
      .addCase(fetchProductsWithDifferentSeller.rejected, (state) => {
        state.products.isLoading = false;
        state.products.isError = false;
      })
      .addCase(fetchProductsWithDifferentSeller.fulfilled, (state, action) => {
        state.products.isLoading = false;
        state.products.data = action.payload;
      });

    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categories.isLoading = true;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categories.isLoading = false;
        state.categories.isError = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories.isLoading = false;
        state.categories.data = action.payload;
      });
  },
});

export const fetchAllReducer = fetchAllSlices.reducer;
