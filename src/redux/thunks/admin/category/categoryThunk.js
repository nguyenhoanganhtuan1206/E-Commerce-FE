import { createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const response = await apiClient.get("/category");

    return response.data;
  }
);
