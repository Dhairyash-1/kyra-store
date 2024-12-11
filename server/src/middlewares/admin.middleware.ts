import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/customRequest";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const verifyAdminRole = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const user = req?.user;

      if (!user) {
        throw new ApiError(
          401,
          "Unauthorized: Please login to access this resource."
        );
      }

      if (user.role !== "admin") {
        throw new ApiError(
          403,
          "Forbidden: You do not have permission to access this resource."
        );
      }

      next();
    } catch (error) {
      console.error("Error in verifying admin role:", error);

      next(error);
    }
  }
);
