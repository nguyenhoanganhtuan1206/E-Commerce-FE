import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valuesSelected: [],
};

const multipleSelectSlices = createSlice({
  name: "multipleSelect",
  initialState,
  reducers: {
    handleOnChange: (state, action) => {
      const valuesSelected = state.valuesSelected;
      const valueExisted = valuesSelected.indexOf(action.payload);

      if (valueExisted === -1) {
        state.valuesSelected = [...state.valuesSelected, action.payload];
      } else {
        state.valuesSelected = state.valuesSelected.filter(
          (item) => item !== action.payload
        );
      }
    },
    handleDeleteItem: (state, action) => {
      state.valuesSelected = state.valuesSelected.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const { handleDeleteItem, handleOnChange } =
  multipleSelectSlices.actions;
export const multipleSelectReducer = multipleSelectSlices.reducer;
