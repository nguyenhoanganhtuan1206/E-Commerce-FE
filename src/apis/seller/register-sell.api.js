import { useCallback } from "react";
import useApiClient from "../../shared/hooks/useAxios";

export const useRegisterSellApis = () => {
  const { apiClient, error } = useApiClient();

  const sendRequestConfirmEmail = useCallback(
    async (data) => {
      try {
        await apiClient.post("/seller/confirm-register", data);
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  const registerNewSeller = useCallback(
    async (param, data) => {
      try {
        await apiClient.put(`/seller?${param}`, data);
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  return { sendRequestConfirmEmail, registerNewSeller };
};
