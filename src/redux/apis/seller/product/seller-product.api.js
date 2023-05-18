import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const useSellerProductApis = createApi({
  reducerPath: "sellerProducts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/products",
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
      createProduct: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: "Seller" }];
        },
        query: (data) => {
          return {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});

export const { useCreateProductMutation } = useSellerProductApis;
export { useSellerProductApis };
