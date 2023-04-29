import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
  messageSuccessful: null,
  isShowConfirmEmail: false,
  paymentMethods: [],
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
    handleChangePaymentMethod: (state, action) => {
      if (action.payload.checked) {
        state.paymentMethods = [...state.paymentMethods, action.payload.name];
      } else {
        state.paymentMethods = state.paymentMethods.filter(
          (value) => value !== action.payload.name
        );
      }
    },
  },
});

export const {
  clearMessageSuccessful,
  setMessageRegisterSuccessful,
  toggleShowConfirmEmail,
  handleChangePaymentMethod,
  toggleShowModalFeedback,
} = sellerSlices.actions;
export const sellerReducer = sellerSlices.reducer;
