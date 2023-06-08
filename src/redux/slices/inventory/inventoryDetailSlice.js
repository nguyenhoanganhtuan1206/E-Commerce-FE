import { createSlice } from "@reduxjs/toolkit";
import {
  fetchColorValuesBySizeValue,
  fetchInventoryDetailByParams,
  fetchSizeValuesByColorValue,
} from "../../thunks/inventory/inventoryDetailThunk";

const initialState = {
  colorValueSelected: null,
  sizeValueSelected: null,
  inventoryDetailData: null,
  sizeValuesData: [],
  colorValuesData: [],
};

const inventoryDetailSlices = createSlice({
  name: "inventoryDetail",
  initialState,
  reducers: {
    onSelectColorValue: (state, action) => {
      state.colorValueSelected = action.payload;
    },
    onSelectSizeValue: (state, action) => {
      state.sizeValueSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSizeValuesByColorValue.fulfilled, (state, action) => {
      state.sizeValuesData = action.payload;
    });

    builder.addCase(fetchColorValuesBySizeValue.fulfilled, (state, action) => {
      state.colorValuesData = action.payload;
    });

    builder.addCase(fetchInventoryDetailByParams.fulfilled, (state, action) => {
      state.inventoryDetailData = action.payload;
    });
  },
});

export const { onSelectColorValue, onSelectSizeValue } =
  inventoryDetailSlices.actions;
export const inventoryDetailReducer = inventoryDetailSlices.reducer;
