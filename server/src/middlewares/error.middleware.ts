import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ApiError;

  // Check if the error is an instance of ApiError
  if (err instanceof ApiError) {
    error = err;
  } else {
    // Extract relevant error information
    const statusCode = (err as { statusCode: number }).statusCode || 500;
    const message =
      (err as { message: string }).message || "Something went wrong";

    // Create a new instance of ApiError
    error = new ApiError(statusCode, message);
  }

  // Log the error message
  console.error(error.message);

  // Prepare the response object
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  // Return the response
  res.status(error.statusCode).json(response);
};

export default errorHandler;
