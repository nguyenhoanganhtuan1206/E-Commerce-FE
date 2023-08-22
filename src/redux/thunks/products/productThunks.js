import { createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../../shared/hooks/useAxios";
import pause from "../../../utils/pause";

const apiClient = createApiClient();

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    await pause(700);

    const response = await apiClient.get("products");

    return response.data;
  }
);

export const fetchProductsWithDifferentSeller = createAsyncThunk(
  "products/fetchProductsWithDifferentSeller",
  async () => {
    await pause(700);

    const response = await apiClient.get("products/different-seller");

    return response.data;
  }
);