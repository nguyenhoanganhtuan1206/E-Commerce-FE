import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
  messageSuccessful: null,
  isShowConfirmEmail: false,
  isShowModalFeedback: false,
};

const sellerSlices = createSlice({
  name: "seller",
  initialState,
  reducers: {
    toggleShowConfirmEmail: (state) => {
      state.isShowConfirmEmail = !state.isShowConfirmEmail;
    },
    toggleShowModalFeedback: (state) => {
      state.isShowModalFeedback = !state.isShowModalFeedback;
    },
    setMessageRegisterSuccessful: (state, action) => {
      state.messageSuccessful = action.payload;
    },
    clearMessageSuccessful: (state) => {
      state.messageSuccessful = null;
    },
  },
});

export const {
  clearMessageSuccessful,
  setMessageRegisterSuccessful,
  toggleShowConfirmEmail,
  toggleShowModalFeedback,
} = sellerSlices.actions;
export const sellerReducer = sellerSlices.reducer;
