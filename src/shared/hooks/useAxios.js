import axios from "axios";

const createApiClient = () => {
  const apiClient = axios.create({
    baseURL: "https://e-commerce-dz5k.onrender.com/api/v1",
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
        localStorage.clear();
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default createApiClient;
