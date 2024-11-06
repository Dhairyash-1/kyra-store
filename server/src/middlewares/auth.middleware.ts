import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import prisma from "../prismaClient/prismaClient";
import { CustomRequest } from "../types/customRequest";

const verifyJWT = asyncHandler(
  async (req: CustomRequest, _: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new ApiError(401, "Unauthorized request");
      }

      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret
      ) as { id: number };

      const user = await prisma.user.findUnique({
        where: { id: decodedToken.id },
        select: {
          id: true,
          email: true,
        },
      });

      if (!user) {
        throw new ApiError(401, "Invalid Access token");
      }

      // Attach the user to the request object
      req.user = user;

      next();
    } catch (error: any) {
      console.error(error);
      throw new ApiError(401, error.message || "Invalid Access token");
    }
  }
);

export { verifyJWT };
