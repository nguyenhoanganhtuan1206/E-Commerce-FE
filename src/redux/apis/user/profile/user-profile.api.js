import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const userProfileApis = createApi({
  reducerPath: "userProfile",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/profile",
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
      fetchProfile: builder.query({
        providesTags: (result, error, user) => {
          return [{ type: "Profile", id: result.id }];
        },
        query: () => {
          return {
            method: "GET",
          };
        },
      }),
      updateProfile: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "Profile", id: result.id }];
        },
        query: (data) => {
          return {
            method: "PUT",
            body: data,
          };
        },
      }),
      updateUserPassword: builder.mutation({
        query: (data) => {
          return {
            url: "/update-password",
            method: "PUT",
            body: data,
          };
        },
      }),
    };
  },
});

export const {
  useFetchProfileQuery,
  useUpdateProfileMutation,
  useUpdateUserPasswordMutation,
} = userProfileApis;
export { userProfileApis };
