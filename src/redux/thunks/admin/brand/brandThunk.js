import { createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchBrands = createAsyncThunk("brand/fetchBrand", async () => {
  const response = await apiClient.get("/brands");

  return response.data;
});
