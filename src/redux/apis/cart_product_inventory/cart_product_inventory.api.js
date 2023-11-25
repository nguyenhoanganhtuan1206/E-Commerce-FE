import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const useCartProductInventoryApis = createApi({
  reducerPath: "cartProductInventory",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/cart-product-inventory",
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
      fetchByCartId: builder.query({
        invalidatesTags: () => {
          return [{ type: "CartProductInventory" }];
        },
        query: (cartId) => {
          return {
            url: `/cart/${cartId}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchByCartIdQuery } = useCartProductInventoryApis;
export { useCartProductInventoryApis };
