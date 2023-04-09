import { useCallback } from "react";
import useApiClient from "../../shared/hooks/useAxios";

export const useSellerApis = () => {
  const { apiClient, error } = useApiClient();

  const getAllSellers = useCallback(async () => {
    try {
      const response = await apiClient.get("/admin/sellers");

      return response.data;
    } catch (err) {
      throw err?.response?.data?.message || error;
    }
  }, [apiClient, error]);

  const getSellerById = useCallback(
    async (sellerId) => {
      try {
        const response = await apiClient.get(`/admin/sellers/${sellerId}`);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  const sendFeedbackToUser = useCallback(
    async (data, sellerId) => {
      try {
        const response = await apiClient.post(
          `admin/sellers/${sellerId}/feedback`,
          data
        );

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  return { getAllSellers, getSellerById, sendFeedbackToUser };
};
