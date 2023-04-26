import { createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchBrandByCategoryName = createAsyncThunk(
  "brand/fetchBrand",
  async (params) => {
    const response = await apiClient.get(`/brand?categoryName=${params}`);

    return response.data;
  }
);
