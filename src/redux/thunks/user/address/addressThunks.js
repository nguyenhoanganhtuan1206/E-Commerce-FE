import { createAsyncThunk } from "@reduxjs/toolkit";
import createApiClient from "../../../../shared/hooks/useAxios";

const apiClient = createApiClient();

export const fetchProvinces = createAsyncThunk(
  "address/fetchProvinces",
  async () => {
    const response = await apiClient.get("/address");

    return response.data;
  }
);

export const fetchDistrictsByProvinceName = createAsyncThunk(
  "address/fetchDistricts",
  async (provinceName) => {
    const response = await apiClient.get(
      `/address/districts/${provinceName}/province`
    );

    return response.data;
  }
);

export const fetchCommunesByDistrictName = createAsyncThunk(
  "address/fetchCommunes",
  async (districtName) => {
    const response = await apiClient.get(
      `/address/communes/${districtName}/district`
    );

    return response.data;
  }
);
