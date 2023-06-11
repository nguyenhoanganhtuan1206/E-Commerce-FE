import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../utils/pause";

const useCartApis = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/carts",
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
      addToCart: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "CartProduct" }];
        },
        query: (data) => {
          return {
            url: "add-to-cart",
            method: "POST",
            body: data,
          };
        },
      }),
      fetchCartByCurrentUserId: builder.query({
        providesTags: () => {
          return [{ type: "CartProduct" }];
        },
        query: () => {
          return {
            url: "details",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useAddToCartMutation, useFetchCartByCurrentUserIdQuery } =
  useCartApis;
export { useCartApis };
