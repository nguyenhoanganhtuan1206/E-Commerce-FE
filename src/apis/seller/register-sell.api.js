import { useCallback } from "react";
import useApiClient from "../../shared/hooks/useAxios";

export const useRegisterSellApis = () => {
  const { apiClient, error } = useApiClient();

  const getRegisteredSellerDetailsByUserId = useCallback(async () => {
    try {
      const response = await apiClient.get("/seller/registration");

      return response.data;
    } catch (err) {
      throw err?.response?.data?.message || error;
    }
  }, [apiClient, error]);

  const registerNewSeller = useCallback(
    async (data) => {
      try {
        const response = await apiClient.post("/seller/registration", data);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  const updateSeller = useCallback(
    async (data) => {
      try {
        const response = await apiClient.put("/seller/registration", data);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  return {
    getRegisteredSellerDetailsByUserId,
    registerNewSeller,
    updateSeller,
  };
};
