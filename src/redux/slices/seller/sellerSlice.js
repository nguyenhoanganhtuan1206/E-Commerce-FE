import { createSlice } from "@reduxjs/toolkit";
import { fetchSellerDetail } from "../../thunks/seller/sellerThunk";

const sellerSlices = createSlice({
  name: "seller",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
    messageSuccessful: null,
    isShowConfirmEmail: false,
    paymentMethods: [],
    isCheckedCod: false,
    isCheckedPaypal: false,
  },
  reducers: {
    toggleShowConfirmEmail: (state) => {
      state.isShowConfirmEmail = !state.isShowConfirmEmail;
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
      // state.paymentMethods = action.payload.paymentMethods;
    });
  },
});

export const {
  clearMessageSuccessful,
  setMessageRegisterSuccessful,
  toggleShowConfirmEmail,
  handleChangePaymentMethod,
  setCheckedPaymentMethod,
} = sellerSlices.actions;
export const sellerReducer = sellerSlices.reducer;
