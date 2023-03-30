import { useCallback } from "react";
import useApiClient from "../../shared/hooks/useAxios";

export const useVariantApis = () => {
  const { apiClient, error } = useApiClient();

  const getVariantsByCategoryName = useCallback(
    async (params) => {
      try {
        const response = await apiClient(
          `/category-variant?categoryName=${params}`
        );

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  return { getVariantsByCategoryName };
};
