import {
  verifyCreateCollectionSchema,
  verifyExecuteCodeSchema,
} from "@expense-tracker/shared";
import { NextFunction, Request, Response } from "express";
import { CreateCollectionBody, ExecuteCodeBody } from "./types";

export const verifyCreateCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { input }: CreateCollectionBody = req.body;
  const validate = verifyCreateCollectionSchema.safeParse(input);
  if (!validate.success) {
    return res.status(400).json({ code: "400000", errors: validate.error });
  }
  return next();
};

export const verifyExecuteCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { input }: ExecuteCodeBody = req.body;
  const validate = verifyExecuteCodeSchema.safeParse(input);

  if (!validate.success) {
    return res.status(400).json({ code: "400000", errors: validate.error });
  }
  return next();
};
