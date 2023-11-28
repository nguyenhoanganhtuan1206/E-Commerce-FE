import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idParams: null,
  isShowModalUpdate: false,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    toggleShowModalUpdate: (state, action) => {
      state.isShowModalUpdate = !state.isShowModalUpdate;

      if (state.isShowModalUpdate) {
        state.idParams = action.payload;
      }
    },
  },
});

export const { toggleShowModalUpdate } = commonSlice.actions;
export const commonSliceReducer = commonSlice.reducer;
