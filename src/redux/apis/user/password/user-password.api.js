import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const userPasswordApis = createApi({
  reducerPath: "userPassword",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/auth",
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
            url: "/forget-password",
            method: "POST",
            body: data,
          };
        },
      }),
      resetPassword: builder.mutation({
        query: (payload) => {
          return {
            url: `/reset-password`,
            body: payload,
            method: "PUT",
          };
        },
      }),
      verifyCodeResetPassword: builder.query({
        query: (code) => {
          return {
            url: `check-expiration-code?code=${code}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyCodeResetPasswordQuery,
} = userPasswordApis;
export { userPasswordApis };
