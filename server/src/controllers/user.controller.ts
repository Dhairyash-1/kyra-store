import prisma from "../prismaClient/prismaClient";
import { CustomRequest } from "../types/customRequest";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { comparePassword, hashPassword } from "../utils/hashUtils";
import jwt, { Secret } from "jsonwebtoken";

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
    httponly: true,
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

  const option = {
    httponly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("refreshToken", option)
    .clearCookie("accessToken", option)
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
  const option = {
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
    .cookie("refreshToken", refreshToken, option)
    .cookie("accessToken", accessToken, option)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "AccessToken refreshed"
      )
    );
});
