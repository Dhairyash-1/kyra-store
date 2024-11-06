import { Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}
