import { createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    const response = await apiClient.get(`/products/${productId}`);

    return response.data;
  }
);
