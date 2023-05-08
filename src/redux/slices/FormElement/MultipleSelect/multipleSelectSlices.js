import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowDropdown: false,
  selectedValues: [],
};

const multipleSelectSlices = createSlice({
  name: "multipleSelect",
  initialState,
  reducers: {
    toggleShowDropdown: (state) => {
      state.isShowDropdown = !state.isShowDropdown;
    },
    handleSelectValues: (state, action) => {
      const valueSelected = state.selectedValues.indexOf(action.payload);

      if (valueSelected === -1) {
        state.selectedValues = [...state.selectedValues, action.payload];
      } else {
        state.selectedValues = state.selectedValues.filter(
          (value) => value !== action.payload
        );
      }
    },
  },
});

export const { handleSelectValues, toggleShowDropdown } =
  multipleSelectSlices.actions;
export const multipleSelectReducer = multipleSelectSlices.reducer;
