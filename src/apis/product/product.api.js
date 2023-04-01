import { useCallback } from "react";
import useApiClient from "../../shared/hooks/useAxios";

export const useProductApis = () => {
  const { apiClient, error } = useApiClient();

  const createProduct = useCallback(
    async (data) => {
      try {
        await apiClient.post("/products", data);
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  return { createProduct };
};
