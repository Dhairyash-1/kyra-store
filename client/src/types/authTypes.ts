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
    role: "admin" | "user";
    firstName: string;
    lastName: string;
    termsAccepted: boolean;
    img: string;
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
    role: "admin" | "user";
    firstName: string;
    lastName: string;
    phone: string;
    imgUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  message: string;
  success: boolean;
}
export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  img?: string;
}

export interface UpdatedUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  img?: string;
}

export interface ShippingAddress {
  id: number;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  pincode: string;
  state: string;
  isDefaultShipping: boolean;
}

export interface addShippingAddressRequest {
  fullName: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface GetAllShippingAddressResponse {
  statusCode: number;
  data: ShippingAddress[];
  message: string;
  success: boolean;
}
export interface SingleShippingAddressResponse {
  statusCode: number;
  data: ShippingAddress;
  message: string;
  success: boolean;
}
