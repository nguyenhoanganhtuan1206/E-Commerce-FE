import { useCallback } from "react";
import useApiClient from "../../../shared/hooks/useAxios";

export const useLocationApis = () => {
  const { apiClient, error } = useApiClient();

  const addLocationForUser = useCallback(
    async (data) => {
      try {
        const response = await apiClient.post("/profile/locations", data);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [error, apiClient]
  );

  return { addLocationForUser };
};
