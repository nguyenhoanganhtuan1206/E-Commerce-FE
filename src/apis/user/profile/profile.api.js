import { useCallback } from "react";
import useApiClient from "../../../shared/hooks/useAxios";

export const useProfileApis = () => {
  const { apiClient, error } = useApiClient();

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await apiClient.get("/profile");

      return response.data;
    } catch (err) {
      throw err?.response?.data?.message || error;
    }
  }, [apiClient, error]);

  const updateUserProfile = useCallback(
    async (data) => {
      try {
        const response = await apiClient.put("/profile", data);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  const updateUserPassword = useCallback(
    async (data) => {
      try {
        const response = await apiClient.put("/profile/update-password", data);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  return { fetchUserProfile, updateUserProfile, updateUserPassword };
};
