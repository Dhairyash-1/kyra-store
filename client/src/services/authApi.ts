import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import {
  addShippingAddressRequest,
  CurrentUserResponse,
  ForgotPasswordRequest,
  GetAllShippingAddressResponse,
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  ResetPasswordRequest,
  ShippingAddress,
  SingleShippingAddressResponse,
  SuccessResponse,
  UpdatedUserResponse,
  UpdateUserRequest,
  VerifyOTPRequest,
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
const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("resutl", result);
  if (
    result.error &&
    result.error.status === 401 &&
    // @ts-expect-error add type here
    result.error.data.message === "jwt expired"
  ) {
    const refreshResult = await baseQuery(
      {
        url: "/user/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    }

    console.log("refresh", refreshResult);
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ShippingAddress", "ShippingAddressId"],
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
    forgotPassword: builder.mutation<SuccessResponse, ForgotPasswordRequest>({
      query: (data) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<SuccessResponse, VerifyOTPRequest>({
      query: (data) => ({
        url: "/user/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<SuccessResponse, ResetPasswordRequest>({
      query: (data) => ({
        url: "/user/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    getCurrentUser: builder.query<CurrentUserResponse, void>({
      query: () => "/user/me",
    }),
    updateUserProfile: builder.mutation<
      UpdatedUserResponse,
      Partial<UpdateUserRequest>
    >({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
    }),

    addShippingAddress: builder.mutation<void, addShippingAddressRequest>({
      query: (data) => ({
        url: "/user/add-address",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ShippingAddress"],
    }),

    getShippingAddress: builder.query<GetAllShippingAddressResponse, void>({
      query: () => "/user/shipping-address",
      providesTags: ["ShippingAddress"],
    }),
    deleteShippingAddress: builder.mutation<void, { id: number }>({
      query: (data) => ({
        url: `/user/delete-address/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ShippingAddress"],
    }),
    updateShippingAddress: builder.mutation<
      SingleShippingAddressResponse,
      addShippingAddressRequest
    >({
      query: (data) => ({
        url: "/user/update-address",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ShippingAddress", "ShippingAddressId"],
    }),

    getShippingAddressById: builder.query<
      SingleShippingAddressResponse,
      { id: number }
    >({
      query: (data) => `/user/address/${data.id}`,
      providesTags: ["ShippingAddressId"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateUserProfileMutation,
  useAddShippingAddressMutation,
  useGetShippingAddressQuery,
  useDeleteShippingAddressMutation,
  useUpdateShippingAddressMutation,
  useGetShippingAddressByIdQuery,
} = authApi;
