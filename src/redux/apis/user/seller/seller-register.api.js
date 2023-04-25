import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const useSellerRegisterApi = createApi({
  reducerPath: "sellerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/",
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
      /* ADMIN */
      fetchListSellers: builder.query({
        providesTags: (result, error, args) => {
          const tags = result.map((seller) => {
            return { type: "UserSellers", id: seller.userId };
          });
          tags.push({ type: "Seller" });

          return tags;
        },
        query: () => {
          return {
            url: "/admin/sellers",
            method: "GET",
          };
        },
      }),

      /* USER */
      registerNewSeller: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: "Seller" }];
        },
        query: (data) => {
          return {
            url: "/seller/registration",
            body: data,
            method: "POST",
          };
        },
      }),
      updateSeller: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: "UserSellers", id: result.userId }];
        },
        query: (data) => {
          return {
            url: "/seller/registration",
            body: data,
            method: "PUT",
          };
        },
      }),
    };
  },
});

export const {
  useRegisterNewSellerMutation,
  useFetchDetailSellerByUserIdQuery,
  useFetchListSellersQuery,
  useUpdateSellerMutation,
} = useSellerRegisterApi;
export { useSellerRegisterApi };
