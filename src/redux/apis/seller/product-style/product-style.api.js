import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const useProductStyleApis = createApi({
  reducerPath: "productStyles",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/product-styles",
    fetchFn: async (...args) => {
      await pause(500);
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
      fetchProductStylesBySellerId: builder.query({
        providesTags: (result, error, args) => {
          return [{ type: "ProductStyles" }];
        },
        query: () => {
          return {
            url: "/seller",
            method: "GET",
          };
        },
      }),
      addProductStyle: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: "ProductStyles" }];
        },
        query: (data) => {
          return {
            method: "POST",
            body: data,
          };
        },
      }),
      deleteProductStyle: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: "ProductStyles" }];
        },
        query: (data) => {
          return {
            url: `?styleName=${data}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useAddProductStyleMutation,
  useFetchProductStylesBySellerIdQuery,
  useDeleteProductStyleMutation,
} = useProductStyleApis;
export { useProductStyleApis };
