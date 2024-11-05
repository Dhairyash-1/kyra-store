import prisma from "../prismaClient/prismaClient";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { comparePassword, hashPassword } from "../utils/hashUtils";

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

  const { password: _, ...userWithoutPasword } = user;

  return res
    .status(200)
    .json(
      new ApiResponse(200, userWithoutPasword, "User LoggedIn Successfully")
    );
});
