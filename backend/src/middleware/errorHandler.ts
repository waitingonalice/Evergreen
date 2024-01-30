/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

/** Global error handler to handle unforeseen errors */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE === "development") console.error(error);
  return res.status(500).json({ code: error.message });
};
