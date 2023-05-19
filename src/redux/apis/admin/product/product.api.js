import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const useProductApis = createApi({
  reducerPath: "adminProducts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/admin/products",
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
      fetchProducts: builder.query({
        providesTags: (result, error, args) => {
          const tags = result.map((seller) => {
            return { type: "SellerProducts", id: seller.sellerId };
          });
          tags.push({ type: "Product" });

          return tags;
        },
        query: () => {
          return {
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchProductsQuery } = useProductApis;
export { useProductApis };
