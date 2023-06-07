import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowForm: false,
  colorName: "",
  sizeName: "",
  formNumbers: 1,
  isShowFormSize: false,
  isDuplicate: false,
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

      if (!!state.colorName && !!state.sizeName) {
        if (state.colorName.toLowerCase() === state.sizeName.toLowerCase()) {
          state.isDuplicate = true;
        } else {
          state.isDuplicate = false;
        }
      }
    },
    handleOnChangeSizeName: (state, action) => {
      state.sizeName = action.payload;

      if (!!state.colorName && !!state.sizeName) {
        if (
          state.colorName.toLowerCase().trim() ===
          state.sizeName.toLowerCase().trim()
        ) {
          state.isDuplicate = true;
        } else {
          state.isDuplicate = false;
        }
      }
    },
    handleIncreaseFormNum: (state) => {
      state.formNumbers += 1;
    },
    handleDecreaseFormNum: (state) => {
      state.formNumbers -= 1;
    },
    setStateShowForm: (state, action) => {
      state.isShowForm = action.payload;
    },
    setStateShowFormSize: (state, action) => {
      state.isShowFormSize = action.payload;
    },
    resetCategorizationForm: (state) => {
      state.colorName = "";
      state.sizeName = "";
    },
  },
});

export const {
  toggleShowAddForm,
  toggleShowFormSize,
  handleOnChangeSizeName,
  handleOnChangeColorName,
  handleIncreaseFormNum,
  handleDecreaseFormNum,
  setStateShowForm,
  setStateShowFormSize,
  resetCategorizationForm,
} = productCategorizationSlices.actions;
export const productCategorizationReducer = productCategorizationSlices.reducer;
