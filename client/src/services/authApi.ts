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

export const forgotPassword = async (data: { email: string }) => {
  const response = await apiClient.post("/user/forgot-password", data);
  return response.data;
};
export const verifyOTP = async (data: { email: string; OTP: string }) => {
  const response = await apiClient.post("/user/verify-otp", data);
  return response.data;
};
export const resetPassword = async (data: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("/user/reset-password", data);
  return response.data;
};
