import { useCallback } from "react";
import useApiClient from "../../../shared/hooks/useAxios";

export const useForgetPasswordApis = () => {
  const { apiClient, error } = useApiClient();

  const sendRequestConfirmEmail = useCallback(
    async (data) => {
      try {
        await apiClient.post("/auth/forget-password", data);
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  const updatePassword = useCallback(
    async (param, data) => {
      try {
        await apiClient.put(`/auth/reset-password?token=${param}`, data);
      } catch (err) {
        throw err?.response?.data?.message || error;
      }
    },
    [apiClient, error]
  );

  return { sendRequestConfirmEmail, updatePassword };
};
