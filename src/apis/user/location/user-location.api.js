import { useCallback } from "react";
import createApiClient from "../../../shared/hooks/useAxios";

export const useLocationApis = () => {
  const apiClient = createApiClient();

  const fetchLocationById = useCallback(
    async (locationId) => {
      try {
        const response = await apiClient.get(`/locations/${locationId}`);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message;
      }
    },
    [apiClient]
  );

  return {
    fetchLocationById,
  };
};
