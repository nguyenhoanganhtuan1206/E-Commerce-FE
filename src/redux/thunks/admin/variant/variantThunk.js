import { createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchCategoryVariants = createAsyncThunk(
  "categoryVariant/fetchCategoryVariant",
  async () => {
    const response = await apiClient.get("/variants");

    return response.data;
  }
);
