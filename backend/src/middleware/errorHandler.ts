/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { AppError } from "~/utils/appError";

/** Global error handler to handle unforeseen errors */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE === "development") console.error(error);
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ code: error.message });
  }
  return res.status(500).json({ code: error.message });
};
