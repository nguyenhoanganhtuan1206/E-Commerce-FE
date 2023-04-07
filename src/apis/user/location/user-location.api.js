import { useCallback } from "react";
import useApiClient from "../../../shared/hooks/useAxios";

export const useLocationApis = () => {
  const { apiClient, error } = useApiClient();

  const getLocationById = useCallback(
    async (locationId) => {
      try {
        const response = await apiClient.get(`/locations/${locationId}`);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  const getLocationsByUserId = useCallback(async () => {
    try {
      const response = await apiClient.get("/locations");

      return response.data;
    } catch (err) {
      throw err?.response?.data?.message || error;
    }
  }, [error, apiClient]);

  const addLocationForUser = useCallback(
    async (data) => {
      try {
        const response = await apiClient.post("/locations", data);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [error, apiClient]
  );

  const updateLocationForUser = useCallback(
    async (data, locationId) => {
      try {
        const response = await apiClient.put(`/locations/${locationId}`, data);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  const deleteLocationById = useCallback(
    async (locationId) => {
      try {
        const response = await apiClient.delete(`/locations/${locationId}`);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );
  return {
    getLocationById,
    getLocationsByUserId,
    addLocationForUser,
    updateLocationForUser,
    deleteLocationById,
  };
};
