import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const userPasswordApis = createApi({
  reducerPath: "userPassword",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/",
    fetchFn: async (...args) => {
      await pause(600);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => {
    return {
      forgetPassword: builder.mutation({
        query: (data) => {
          return {
            url: "/auth/forget-password",
            method: "POST",
            body: data,
          };
        },
      }),
      resetPassword: builder.mutation({
        query: (payload) => {
          return {
            url: `/auth/reset-password?token=${payload.token}`,
            body: payload.data,
            method: "PUT",
          };
        },
      }),
    };
  },
});

export const { useForgetPasswordMutation, useResetPasswordMutation } =
  userPasswordApis;
export { userPasswordApis };