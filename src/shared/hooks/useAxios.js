import axios from "axios";
import { useState } from "react";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

const useApiClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  apiClient.interceptors.request.use((config) => {
    setIsLoading(true);

    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  apiClient.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      setIsLoading(false);

      if (error.response.status !== 200) {
        localStorage.clear();
        setError(error.response.data.message || "Some error occurred");
      }

      return Promise.reject(error);
    }
  );

  return { error, isLoading };
};

export default useApiClient;
