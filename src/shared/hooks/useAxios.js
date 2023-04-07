import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";

const useApiClient = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(null);

  const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });

  apiClient.interceptors.request.use((config) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 403 || error.response.status === 401) {
        authContext.logout();
        localStorage.clear();
      }

      setError(error.response.data.message || "Some error occurred");

      return Promise.reject(error);
    }
  );

  return { error, apiClient };
};

export default useApiClient;
