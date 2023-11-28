import { createSlice } from "@reduxjs/toolkit";

export const MY_ORDER_TABS = {
  ALL_ORDERS: "ALL_ORDERS",
  COMPLETED: "COMPLETED",
  WAITING_FOR_PAYMENT: "WAITING_FOR_PAYMENT",
};

const initialState = {
  myCurrentTab: MY_ORDER_TABS.ALL_ORDERS,
  numbersAllOrders: 0,
  numbersCompleted: 0,
  numbersWaitingPayment: 0,
};

const myOrderSlices = createSlice({
  name: "myOrderSlices",
  initialState,
  reducers: {
    switchTab: (state, action) => {
      state.myCurrentTab = action.payload;
    },
    fetchNumberAllOrders: (state, action) => {
      state.numbersAllOrders = action.payload;
    },
    fetchNumberCompleted: (state, action) => {
      state.numbersCompleted = action.payload;
    },
    fetchNumbersWaitingPayment: (state, action) => {
      state.numbersWaitingPayment = action.payload;
    },
  },
});

export const { switchTab, fetchNumberAllOrders, fetchNumberCompleted, fetchNumbersWaitingPayment } =
  myOrderSlices.actions;
export const myOrderReducers = myOrderSlices.reducer;
