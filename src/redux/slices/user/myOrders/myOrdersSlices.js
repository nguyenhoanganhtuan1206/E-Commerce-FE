import { createSlice } from "@reduxjs/toolkit";

export const MY_ORDER_TABS = {
  ALL_ORDERS: "ALL_ORDERS",
  AWAITING_FOR_PAYMENT: "AWAITING_FOR_PAYMENT",
  AWAITING_FOR_DELIVERY: "AWAITING_FOR_DELIVERY",
};

const initialState = {
  myCurrentTab: MY_ORDER_TABS.ALL_ORDER,
};

const myOrderSlices = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    switchTab: (state, action) => {
      state.myCurrentTab = action.payload;
    },
  },
});

export const { switchTab } = myOrderSlices.actions;
export const myOrderReducers = myOrderSlices.reducer;
