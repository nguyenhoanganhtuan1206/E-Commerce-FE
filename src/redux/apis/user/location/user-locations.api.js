import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import pause from "../../../../utils/pause";

const userLocationsApi = createApi({
  reducerPath: "userLocations",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/locations",
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
    const userId = JSON.parse(localStorage.getItem("userData")).userId;

    return {
      fetchLocations: builder.query({
        providesTags: (result, error, location) => {
          const tags = result.map((location) => {
            return { type: "Location", id: location.id };
          });
          tags.push({ type: "UserLocations", id: userId });

          return tags;
        },
        query: () => {
          return {
            method: "GET",
          };
        },
      }),
      addLocations: builder.mutation({
        invalidatesTags: (result, error, location) => {
          return [{ type: "UserLocations", id: result.userId }];
        },
        query: (data) => {
          return {
            method: "POST",
            body: data,
          };
        },
      }),
      updateLocation: builder.mutation({
        invalidatesTags: (result, error, location) => {
          return [{ type: "Location", id: result.id }];
        },
        query: (payload) => {
          return {
            url: `${payload.locationId}`,
            body: payload.data,
            method: "PUT",
          };
        },
      }),
      removeLocation: builder.mutation({
        invalidatesTags: (result, error, locationId) => {
          return [{ type: "Location", id: locationId }];
        },
        query: (locationId) => {
          return {
            url: `${locationId}`,
            method: "DELETE",
          };
        },
      }),
      updateDefaultLocation: builder.mutation({
        invalidatesTags: (result, error, location) => {
          return [{ type: "Location", id: result.id }];
        },
        query: (locationId) => {
          return {
            url: `${locationId}/default`,
            method: "PUT",
          };
        },
      }),
    };
  },
});

export const {
  useFetchLocationsQuery,
  useAddLocationsMutation,
  useUpdateLocationMutation,
  useRemoveLocationMutation,
  useUpdateDefaultLocationMutation,
} = userLocationsApi;
export { userLocationsApi };
