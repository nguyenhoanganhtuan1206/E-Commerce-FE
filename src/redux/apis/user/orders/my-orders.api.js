import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const useMyOrdersApi = createApi({
  reducerPath: "myOrders",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/orders",
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
      fetchOrders: builder.query({
        invalidatesTags: (result, error, args) => {
          return [{ type: "MyOrders" }];
        },
        query: (payload) => {
          return {
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchOrdersQuery } = useMyOrdersApi;
export { useMyOrdersApi };
