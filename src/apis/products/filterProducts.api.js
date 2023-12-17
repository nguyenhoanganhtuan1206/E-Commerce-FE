import { useCallback } from "react";
import pause from "../../utils/pause";
import createApiClient from "../../shared/hooks/useAxios";

export const useFilterProductApis = () => {
  const apiClient = createApiClient();

  const fetchProducts = useCallback(
    async ({ productName = null, categoryName = null }) => {
      try {
        await pause(700);
        const response = await apiClient.get(
          `/products/search?productName=${productName}&categoryName=${categoryName}`
        );

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message;
      }
    },
    [apiClient]
  );

  return {
    fetchProducts,
  };
};
