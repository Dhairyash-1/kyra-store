import prisma from "../prismaClient/prismaClient";
import { CustomRequest } from "../types/customRequest";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { comparePassword, hashPassword } from "../utils/hashUtils";
import jwt, { Secret } from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { forgotPasswordMailgenContent, sendEmail } from "../utils/sendEmail";

const generateAccessAndRefreshToken = async (userId: number) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const accessToken = jwt.sign(
    {
      id: user?.id,
      email: user?.email,
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = jwt.sign(
    { id: user?.id },
    process.env.REFRESH_TOKEN_SECRET as Secret,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
  return { accessToken, refreshToken };
};

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (
    [firstName, lastName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "User with Email Already exist.");
  }
  const encryptedPass = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: encryptedPass,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.json(
    new ApiResponse(201, newUser, "User Registered Successfully")
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    throw new ApiError(400, "Email and Password required");
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordVaild = await comparePassword(password, user.password);
  if (!isPasswordVaild) {
    throw new ApiError(401, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id
  );
  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  const { password: _, refreshToken: __, ...userWithoutPasword } = user;

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, option)
    .cookie("accessToken", accessToken, option)
    .json(
      new ApiResponse(200, userWithoutPasword, "User LoggedIn Successfully")
    );
});

export const logOutUser = asyncHandler(async (req: CustomRequest, res) => {
  const user = await prisma.user.update({
    where: { id: req?.user?.id },
    data: { refreshToken: null },
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET as Secret
  ) as { id: number };

  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken?.id,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invaild refresh Token");
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "refreshToken is expired or used");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshToken,
    },
  });

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "AccessToken refreshed"
      )
    );
});

export const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required for password reset");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // Generate a 5-digit OTP and set expiry time (15 minutes)
  const OTP = crypto.randomInt(10000, 99999).toString();
  const expireAt = new Date(Date.now() + 15 * 60 * 1000);

  const encryptedOTP = await bcrypt.hash(OTP, 10);

  await prisma.forgotPasswordRequest.create({
    data: {
      userId: user.id,
      otp: encryptedOTP,
      expireAt: expireAt,
    },
  });

  await sendEmail({
    email: email,
    subject: "Forgot Password OTP",
    mailgenContent: forgotPasswordMailgenContent(user.firstName, OTP),
  });

  // Return a response
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "OTP has been sent to your email for password reset. Please check your inbox."
      )
    );
});

export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, OTP } = req.body;

  if (!(email || OTP)) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const OTPSchema = await prisma.forgotPasswordRequest.findFirst({
    where: { userId: user.id, isVerified: false },
    orderBy: { createdAt: "desc" },
  });

  if (!OTPSchema) {
    throw new ApiError(400, "No OTP found or OTP already used");
  }

  if (new Date(OTPSchema.expireAt) < new Date()) {
    await prisma.forgotPasswordRequest.delete({ where: { id: OTPSchema.id } }); // Delete expired OTP
    throw new ApiError(400, "OTP has expired");
  }

  const isOtpValid = await bcrypt.compare(OTP, OTPSchema.otp);
  if (!isOtpValid) {
    throw new ApiError(400, "Invalid OTP");
  }

  await prisma.forgotPasswordRequest.update({
    where: { id: OTPSchema.id },
    data: { isVerified: true },
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "OTP verified successfully. You can now reset your password."
      )
    );
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    throw new ApiError(400, "Email and Password are required");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const OTPSchema = await prisma.forgotPasswordRequest.findFirst({
    where: { userId: user.id, isVerified: true },
    orderBy: { createdAt: "desc" },
  });

  if (!OTPSchema) {
    throw new ApiError(400, "OTP not verified. Please verify the OTP first.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  await prisma.forgotPasswordRequest.delete({
    where: { id: OTPSchema.id },
  });

  res.status(200).json(new ApiResponse(200, "Password reset successfully"));
});

export const getCurrentUser = asyncHandler(async (req: CustomRequest, res) => {
  if (!req?.user?.id) {
    throw new ApiError(401, "Unauthorized request");
  }

  const { id } = req.user;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetched successfully"));
});
