import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const usePaymentOrder = createApi({
  reducerPath: "paymentOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-dz5k.onrender.com/api/v1/payment-order",
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
    };
  },
});

export const { useCreatePaymentMutation } = usePaymentOrder;
export { usePaymentOrder };
