import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const useSellerProductApis = createApi({
  reducerPath: "sellerProducts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-dz5k.onrender.com/api/v1/products",
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
        providesTags: () => {
          return [{ type: "ProductSeller" }];
        },
        query: () => {
          return {
            url: "/user",
            method: "GET",
          };
        },
      }),
      createProduct: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "ProductSeller" }];
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
        invalidatesTags: () => {
          return [{ type: "ProductSeller" }];
        },
        query: (payload) => {
          return {
            method: "PUT",
            body: payload.data,
            url: `${payload.productId}`,
          };
        },
      }),
      deleteProduct: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "ProductSeller" }];
        },
        query: (productId) => {
          return {
            method: "DELETE",
            url: `${productId}`,
          };
        },
      }),
      fetchProductsWithOutOfStock: builder.query({
        providesTags: () => {
          return [{ type: "ProductSeller" }];
        },
        query: () => {
          return {
            url: "out-of-stock",
            method: "GET",
          };
        },
      }),
      fetchProductWithInStock: builder.query({
        providesTags: () => {
          return [{ type: "ProductSeller" }];
        },
        query: () => {
          return {
            url: "in-stock",
            method: "GET",
          };
        },
      }),
      fetchProductWithApproval: builder.query({
        providesTags: () => {
          return [{ type: "ProductSeller" }];
        },
        query: () => {
          return {
            url: "approval",
            method: "GET",
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
  useDeleteProductMutation,
  useFetchProductsWithOutOfStockQuery,
  useFetchProductWithInStockQuery,
  useFetchProductWithApprovalQuery,
} = useSellerProductApis;
export { useSellerProductApis };
