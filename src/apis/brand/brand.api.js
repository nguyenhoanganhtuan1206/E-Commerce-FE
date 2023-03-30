import { useCallback } from "react";
import useApiClient from "../../shared/hooks/useAxios";

export const useBrandApis = () => {
  const { apiClient, error } = useApiClient();

  const getBrandsByCategoryName = useCallback(
    async (params) => {
      try {
        const response = await apiClient(`/brand?categoryName=${params}`);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  return { getBrandsByCategoryName };
};
