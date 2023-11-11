import { createSlice } from "@reduxjs/toolkit";

export const MANAGEMENT_ORDER = {
  ALL_ORDER: "ALL_ORDERS",
  PAID: "ORDERS_PAID",
  NOT_YET_PAID: "ORDERS_NOT_YET_PAID",
};

const initialState = {
  ordersData: null,
  isLoading: false,
  error: null,
  myCurrentTab: MANAGEMENT_ORDER.ALL_ORDER,
  badgePaid: 0,
  badgeNotYetPaid: 0,
};

const ordersSlices = createSlice({
  name: "managementOrders",
  initialState,
  reducers: {
    switchTab: (state, action) => {
      state.myCurrentTab = action.payload;
    },
    fetchOrdersPaid: (state, action) => {
      state.badgePaid = action.payload;
    },
    fetchOrdersNotYetPaid: (state, action) => {
      state.badgeNotYetPaid = action.payload;
    },
  },
});

export const { switchTab, fetchOrdersPaid, fetchOrdersNotYetPaid } =
  ordersSlices.actions;

export const managementOrdersReducers = ordersSlices.reducer;
