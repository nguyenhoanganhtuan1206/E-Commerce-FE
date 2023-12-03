import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const useOrderApis = createApi({
  reducerPath: "sellerOrders",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/orders/",
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
      fetchOrdersSeller: builder.query({
        providesTags: () => {
          return [{ type: "SellerOrders" }];
        },
        query: () => {
          return {
            url: "seller",
            method: "GET",
          };
        },
      }),
      fetchOrderDetails: builder.query({
        providesTags: () => {
          return [{ type: "SellerOrders" }];
        },
        query: (orderId) => {
          return {
            url: `seller/${orderId}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchOrdersSellerQuery, useFetchOrderDetailsQuery } =
  useOrderApis;

export { useOrderApis };
