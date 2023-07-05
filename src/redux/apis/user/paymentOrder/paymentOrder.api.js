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
        invalidatesTags: (result, error, args) => {
          return [{ type: "PaymentOrder" }];
        },
        query: (payload) => {
          return {
            method: "POST",
            body: {
              cartIds: payload.cartIds,
              paymentMethod: payload.paymentMethod,
            },
          };
        },
      }),
    };
  },
});

export const { useCreatePaymentMutation } = usePaymentOrder;
export { usePaymentOrder };
