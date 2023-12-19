import { arrayTransactionSchema } from "@expense-tracker/packages";
import { NextFunction, Request, Response } from "express";
import { CreateTransactionRequestBody } from "./types";
import { idSchema } from "./utils";

export const validateCreateTransactions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { variables }: CreateTransactionRequestBody = req.body;
  const validate = arrayTransactionSchema.safeParse(variables);
  if (validate.success) {
    return next();
  }
  return res.status(400).json({ code: validate.error });
};

export const validateTransactionId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const parseId = parseInt(id, 10);
  const validate = idSchema.safeParse(parseId);
  if (validate.success) {
    res.locals.transactionId = parseId;
    return next();
  }
  return res.status(400).json({ code: validate.error });
};
