import { createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchSizeValuesByColorValue = createAsyncThunk(
  "inventoryDetail/fetchSizeValues",
  async (payload) => {
    const response = await apiClient.get(
      `inventories/${payload.productId}/sizeValues?colorValue=${payload.value}`
    );

    return response.data;
  }
);

export const fetchColorValuesBySizeValue = createAsyncThunk(
  "inventoryDetail/fetchColorValues",
  async (payload) => {
    const response = await apiClient.get(
      `inventories/${payload.productId}/colorValues?sizeValue=${payload.value}`
    );

    return response.data;
  }
);

export const fetchInventoryDetailByParams = createAsyncThunk(
  "inventoryDetail/fetchInventoryDetailByParams",
  async (payload) => {
    const response = await apiClient.get(
      `inventories/${payload.productId}/inventoryDetail?sizeValue=${payload.sizeValue}&colorValue=${payload.colorValue}`
    );

    return response.data;
  }
);
