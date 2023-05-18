import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowForm: false,
  colorName: null,
  sizeName: null,
  formNumbers: 1,
  isShowFormSize: false,
};

const productCategorizationSlices = createSlice({
  name: "productCategorization",
  initialState,
  reducers: {
    toggleShowAddForm: (state) => {
      if (!state.isShowForm) {
        /* Set null if turn off */
        state.colorName = null;
        state.sizeName = null;
      }
      state.isShowForm = !state.isShowForm;
    },
    toggleShowFormSize: (state) => {
      state.isShowFormSize = !state.isShowFormSize;
    },
    handleOnChangeColorName: (state, action) => {
      state.colorName = action.payload;
    },
    handleOnChangeSizeName: (state, action) => {
      state.sizeName = action.payload;
    },
    handleIncreaseFormNum: (state) => {
      state.formNumbers += 1;
    },
    handleDecreaseFormNum: (state) => {
      state.formNumbers -= 1;
    }
  },
});

export const {
  toggleShowAddForm,
  toggleShowFormSize,
  handleOnChangeSizeName,
  handleOnChangeColorName,
  handleIncreaseFormNum,
  handleDecreaseFormNum,
} =
  productCategorizationSlices.actions;
export const productCategorizationReducer = productCategorizationSlices.reducer;
