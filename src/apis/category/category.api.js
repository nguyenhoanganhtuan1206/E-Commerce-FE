import { useCallback } from "react";
import useApiClient from "../../shared/hooks/useAxios";

export const useCategoryApis = () => {
  const { apiClient, error } = useApiClient();

  const getCategories = useCallback(async () => {
    try {
      const response = await apiClient.get("/category");

      return response.data;
    } catch (err) {
      throw err?.response?.data?.message || error;
    }
  }, [apiClient, error]);

  return { getCategories };
};
