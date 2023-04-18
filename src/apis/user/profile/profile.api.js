import { useCallback } from "react";
import createApiClient from "../../../shared/hooks/useAxios";
import { toast } from "react-toastify";

export const useProfileApis = () => {
  const apiClient = createApiClient();

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await apiClient.get("/profile");

      console.log("response", response);
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message, { autoClose: 2000 });
    }
  }, [apiClient]);

  const updateUserProfile = useCallback(
    async (data) => {
      try {
        const response = await apiClient.put("/profile", data);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message;
      }
    },
    [apiClient]
  );

  const updateUserPassword = useCallback(
    async (data) => {
      try {
        const response = await apiClient.put("/profile/update-password", data);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message;
      }
    },
    [apiClient]
  );

  return { fetchUserProfile, updateUserProfile, updateUserPassword };
};
