import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCommunesByDistrictName,
  fetchDistrictsByProvinceName,
  fetchProvinces,
} from "../../../thunks/user/address/addressThunks";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    provinces: [],
    communes: [],
    districts: [],
    isLoading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvinces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProvinces.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.provinces = action.payload;
      });

    builder
      .addCase(fetchDistrictsByProvinceName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDistrictsByProvinceName.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(fetchDistrictsByProvinceName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.districts = action.payload;
      });

    builder
      .addCase(fetchCommunesByDistrictName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommunesByDistrictName.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(fetchCommunesByDistrictName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.communes = action.payload;
      });
  },
});

export const addressReducer = addressSlice.reducer;
