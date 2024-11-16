import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
} from "@/types/authTypes";

// export const register = async (data: data) => {
//   const response = await apiClient.post("/user/register", data);
//   return response.data;
// };

// export const login = async (data: loginData) => {
//   const response = await apiClient.post("/user/login", data);
//   return response.data;
// };

// export const forgotPassword = async (data: { email: string }) => {
//   const response = await apiClient.post("/user/forgot-password", data);
//   return response.data;
// };
// export const verifyOTP = async (data: { email: string; OTP: string }) => {
//   const response = await apiClient.post("/user/verify-otp", data);
//   return response.data;
// };
// export const resetPassword = async (data: {
//   email: string;
//   password: string;
// }) => {
//   const response = await apiClient.post("/user/reset-password", data);
//   return response.data;
// };

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation<LoginUserResponse, LoginUserRequest>({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOTPResponse, VerifyOTPRequest>({
      query: (data) => ({
        url: "/user/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/user/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
} = authApi;
