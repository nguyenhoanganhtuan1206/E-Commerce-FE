import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const useCartApis = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/carts",
    fetchFn: async (...args) => {
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
      deleteCartById: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "CartProduct" }];
        },
        query: (productId) => {
          return {
            url: `${productId}`,
            method: "DELETE",
          };
        },
      }),
      increaseQuantity: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "CartProduct" }];
        },
        query: (cartId) => {
          return {
            url: `${cartId}/increase-quantity`,
            method: "PUT",
          };
        },
      }),
      decreaseQuantity: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "CartProduct" }];
        },
        query: (cartId) => {
          return {
            url: `${cartId}/decrease-quantity`,
            method: "PUT",
          };
        },
      }),
    };
  },
});

export const {
  useAddToCartMutation,
  useFetchCartByCurrentUserIdQuery,
  useDeleteCartByIdMutation,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
} = useCartApis;
export { useCartApis };
