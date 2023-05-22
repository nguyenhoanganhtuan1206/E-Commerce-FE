import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isShowFormCreateNewProductStyle: false,
  paymentMethods: [],
  currentStepForm: 1,
};

const addProductSlices = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    toggleShowFormCreateNewProductStyle: (state) => {
      state.isShowFormCreateNewProductStyle =
        !state.isShowFormCreateNewProductStyle;
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
    handleIncreaseStep: (state) => {
      if (state.currentStepForm < 3) {
        state.currentStepForm += 1;
      } else {
        toast.error("Something went wrong! Please try again");
      }
    },
    handleDecreaseStep: (state) => {
      if (state.currentStepForm > 1) {
        state.currentStepForm -= 1;
      } else {
        toast.error("Something went wrong! Please try again");
      }
    },
    handleResetStep: (state) => {
      state.currentStepForm = 1;
    }
  },
});

export const {
  toggleShowFormCreateNewProductStyle,
  handleChangePaymentMethod,
  handleDecreaseStep,
  handleIncreaseStep,
  handleResetStep
} = addProductSlices.actions;
export const addProductReducer = addProductSlices.reducer;
