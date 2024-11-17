export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

export interface RegisterUserResponse {
  statusCode: number;
  data: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
  };
  message: string;
  success: boolean;
}

export interface LoginUserRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginUserResponse {
  statusCode: number;
  data: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    termsAccepted: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  message: string;
  success: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}
export interface SuccessResponse {
  statusCode: number;
  message: string;
  success: boolean;
}

export interface VerifyOTPRequest {
  email: string;
  OTP: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
}
export interface CurrentUserResponse {
  statusCode: number;
  data: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  message: string;
  success: boolean;
}
