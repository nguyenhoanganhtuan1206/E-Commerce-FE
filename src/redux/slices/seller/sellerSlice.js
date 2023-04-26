import { createSlice } from "@reduxjs/toolkit";
import { fetchSellerDetail } from "../../thunks/seller/sellerThunk";

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
  messageSuccessful: null,
  isShowConfirmEmail: false,
  paymentMethods: [],
  isCheckedCod: false,
  isCheckedPaypal: false,
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
    setCheckedPaymentMethod: (state, action) => {
      const paymentMethods = {
        COD: "isCheckedCod",
        Paypal: "isCheckedPaypal",
      };

      const selectedMethod = action.payload;
      const stateProperty = paymentMethods[selectedMethod];

      if (stateProperty) {
        state[stateProperty] = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSellerDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSellerDetail.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchSellerDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export const {
  clearMessageSuccessful,
  setMessageRegisterSuccessful,
  toggleShowConfirmEmail,
  handleChangePaymentMethod,
  setCheckedPaymentMethod,
  toggleShowModalFeedback,
} = sellerSlices.actions;
export const sellerReducer = sellerSlices.reducer;
