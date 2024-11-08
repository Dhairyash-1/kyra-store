import apiClient from "./apiClient";

interface data {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

interface loginData {
  email: string;
  password: string;
}

export const register = async (data: data) => {
  const response = await apiClient.post("/user/register", data);
  return response.data;
};

export const login = async (data: loginData) => {
  const response = await apiClient.post("/user/login", data);
  return response.data;
};
