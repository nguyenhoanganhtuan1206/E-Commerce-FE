import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const authApis = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/",
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (data) => {
          return {
            url: "/auth/login",
            method: "POST",
            body: data,
          };
        },
      }),
      register: builder.mutation({
        query: (data) => {
          return {
            url: "/auth/sign-up",
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});

export const { useLoginMutation, useRegisterMutation } = authApis;
export { authApis };
