import { createSlice } from "@reduxjs/toolkit";

const locationSlices = createSlice({
  name: "location",
  initialState: {
    locationId: null,
    isModalUpdateOpen: false,
    isModalDeleteOpen: false,
    isModalAddOpen: false,
    error: null,
  },
  reducers: {
    toggleModalUpdate: (state, action) => {
      state.locationId = action.payload;
      state.isModalUpdateOpen = !state.isModalUpdateOpen;
    },
    toggleModalAdd: (state) => {
      state.isModalAddOpen = !state.isModalAddOpen;
    },
    toggleModalDelete: (state) => {
      state.isModalDeleteOpen = !state.isModalDeleteOpen;
    },
  },
});

export const { toggleModalAdd, toggleModalDelete, toggleModalUpdate } =
  locationSlices.actions;
export const locationReducer = locationSlices.reducer;
