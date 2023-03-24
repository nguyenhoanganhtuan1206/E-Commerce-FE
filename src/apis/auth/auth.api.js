const register = ({ data, apiClient }) => {
  return apiClient.post("/auth/sign-up", data);
};

const login = ({ data, apiClient }) => {
  return apiClient.post("/auth/login", data);
};

export { register, login };
