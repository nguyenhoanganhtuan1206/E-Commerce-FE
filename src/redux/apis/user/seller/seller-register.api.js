import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const useSellerRegisterApi = createApi({
  reducerPath: "sellerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-dz5k.onrender.com/api/v1/",
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
      fetchSellerById: builder.query({
        providesTags: (result, error, args) => {
          return [{ type: "UserSellers", id: result.userId }];
        },
        query: (sellerId) => {
          return {
            url: `/admin/sellers/${sellerId}`,
            method: "GET",
          };
        },
      }),
      sendFeedback: builder.mutation({
        query: (payload) => {
          return {
            url: `/admin/sellers/${payload.sellerId}/feedback`,
            body: payload.data,
            method: "POST",
          };
        },
      }),
      approvalSellerRequest: builder.mutation({
        invalidatesTags: (result, error, sellerId) => {
          return [{ type: "UserSellers", id: result.userId }];
        },
        query: (sellerId) => {
          return {
            url: `/admin/sellers/${sellerId}/approval`,
            method: "PUT",
          };
        },
      }),

      /* USER */
      fetchDetailSeller: builder.query({
        providesTags: (result, error, args) => {
          if (result) {
            return [{ type: "UserSellers", id: result.userId }];
          }
          return [{ type: "Seller" }];
        },
        query: () => {
          return {
            url: "/seller/registration",
            method: "GET",
          };
        },
      }),
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
          return [{ type: "Seller" }];
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
  useApprovalSellerRequestMutation,
  useFetchListSellersQuery,
  useUpdateSellerMutation,
  useFetchSellerByIdQuery,
  useSendFeedbackMutation,
  useFetchDetailSellerQuery,
} = useSellerRegisterApi;
export { useSellerRegisterApi };
