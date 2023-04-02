import { useCallback } from "react";
import useApiClient from "../../shared/hooks/useAxios";

export const useAddressApis = () => {
  const { apiClient, error } = useApiClient();

  const getProvinces = useCallback(async () => {
    try {
      const response = await apiClient("/address");

      return response.data;
    } catch (err) {
      throw err?.response?.data?.message || error;
    }
  }, [apiClient, error]);

  const getDistrictsByProvinceId = useCallback(
    async (data) => {
      try {
        const response = await apiClient(`/address/districts/${data}/province`);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  const getCommunesByDistrictId = useCallback(
    async (data) => {
      try {
        const response = await apiClient(`/address/communes/${data}/district`);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  return { getProvinces, getDistrictsByProvinceId, getCommunesByDistrictId };
};
