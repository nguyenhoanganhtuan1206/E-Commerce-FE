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
      fetchProductsBySellerId: builder.query({
        providesTags: (result, error, args) => {
          return [{ type: "ProductSeller", id: result.sellerId }];
        },
        query: () => {
          return {
            method: "GET",
          };
        },
      }),
      createProduct: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: "ProductSeller", id: result.sellerId }];
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
      updateProduct: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: "ProductSeller", id: result.sellerId }];
        },
        query: (payload) => {
          return {
            method: "PUT",
            body: payload.data,
            url: `${payload.productId}`,
          };
        },
      }),
    };
  },
});

export const {
  useCreateProductMutation,
  useFetchProductsBySellerIdQuery,
  useUpdateProductMutation,
} = useSellerProductApis;
export { useSellerProductApis };
