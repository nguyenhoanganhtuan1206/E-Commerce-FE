import { createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchCategoryVariantByCategoryName = createAsyncThunk(
  "categoryVariant/fetchCategoryVariant",
  async (params) => {
    const response = await apiClient.get(
      `/category-variant?categoryName=${params}`
    );

    return response.data;
  }
);
