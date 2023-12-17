import { createAsyncThunk } from "@reduxjs/toolkit";
import pause from "../../../utils/pause";
import createApiClient from "../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    await pause(700);

    const response = await apiClient.get("categories");

    return response.data;
  }
);
