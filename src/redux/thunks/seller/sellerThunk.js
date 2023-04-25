import { createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchSellerDetail = createAsyncThunk(
  "seller/fetchDetail",
  async () => {
    const response = await apiClient.get("/seller/registration");

    return response.data;
  }
);
