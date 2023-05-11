import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

import {
  PRODUCT_CATEGORIZATION_COLOR,
  PRODUCT_CATEGORIZATION_SIZE,
} from "../../../../data/product-categorization/product-categorization-data";

const initialState = {
  isShowForm: false,
  colorValues: PRODUCT_CATEGORIZATION_COLOR,
  sizeValues: PRODUCT_CATEGORIZATION_SIZE,
};

const productCategorizationSlices = createSlice({
  name: "productCategorization",
  initialState,
  reducers: {
    toggleShowAddForm: (state) => {
      state.isShowForm = !state.isShowForm;
    },
    addNewColorValue: (state, action) => {
      const isDuplicate = state.colorValues.some(
        (item) =>
          item.colorValue.toLowerCase() ===
          action.payload.colorValue.toLowerCase()
      );

      if (isDuplicate) {
        toast.error(`Color ${action.payload.colorValue} is already existed`);
      } else {
        state.colorValues = [...state.colorValues, action.payload];
      }
    },
    addNewSizeValue: (state, action) => {
      const isDuplicate = state.sizeValues.some(
        (item) =>
          item.colorValue.toLowerCase() ===
          action.payload.sizeValue.toLowerCase()
      );

      if (isDuplicate) {
        toast.error(
          `Size ${action.payload} is already existed! Please choose another value`
        );
      } else {
        state.sizeValues = [...state.sizeValues, action.payload];
      }
    },
  },
});

export const { toggleShowAddForm, addNewColorValue, addNewSizeValue } =
  productCategorizationSlices.actions;
export const productCategorizationReducer = productCategorizationSlices.reducer;
