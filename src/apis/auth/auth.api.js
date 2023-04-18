import { useCallback } from "react";
import useApiClient from "../../shared/hooks/useAxios";
import createApiClient from "../../shared/hooks/useAxios";

export const useAuthApis = () => {
  const apiClient = createApiClient();

  const login = useCallback(
    async (data) => {
      try {
        const response = await apiClient.post("/auth/login", data);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message;
      }
    },
    [apiClient]
  );

  const register = useCallback(
    async (data) => {
      try {
        const response = await apiClient.post("/auth/sign-up", data);

        return response.data;
      } catch (err) {
        throw err?.response?.data?.message;
      }
    },
    [apiClient]
  );

  return { login, register };
};
