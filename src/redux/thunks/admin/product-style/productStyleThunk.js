import { createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchProductStyles = createAsyncThunk(
  "productStyle/fetchProductStyle",
  async () => {
    const response = await apiClient.get("/product-styles");

    return response.data;
  }
);
