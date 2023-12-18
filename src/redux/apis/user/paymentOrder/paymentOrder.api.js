import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const usePaymentOrder = createApi({
  reducerPath: "paymentOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/payment-order",
    fetchFn: async (...args) => {
      await pause(600);
      return fetch(...args);
    },
    prepareHeaders: (headers) => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
    createPayment: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "PaymentOrder" }];
        },
        query: (payload) => {
          return {
            method: "POST",
            body: payload,
          };
        },
      }),
      cancelOrder: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "PaymentOrder" }];
        },
        query: (payload) => {
          return {
            url: "cancel-order",
            method: "PUT",
            body: payload,
          };
        },
      }),
      updateDeliveryStatus: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "PaymentOrder" }];
        },
        query: (payload) => {
          return {
            url: "delivery-status",
            method: "PUT",
            body: payload,
          };
        },
      }),
    };
  },
});

export const {
  useCreatePaymentMutation,
  useCancelOrderMutation,
  useUpdateDeliveryStatusMutation,
} = usePaymentOrder;
export { usePaymentOrder };
