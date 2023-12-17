import { createAsyncThunk } from "@reduxjs/toolkit";
import pause from "../../../../utils/pause";
import createApiClient from "../../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchProductByName = createAsyncThunk(
  "filterProducts/searchByName",
  async (searchTemp) => {
    await pause(700);

    const response = await apiClient.get(
      `products/search?searchTemp=${searchTemp}`
    );

    return response.data;
  }
);
