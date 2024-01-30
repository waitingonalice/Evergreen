import {
  validateCreateCollectionSchema,
  validateExecuteCodeSchema,
  validateGetCollectionSchema,
} from "@expense-tracker/shared";
import { NextFunction, Request, Response } from "express";
import { ZodSchema, z } from "zod";

interface ValidatorType<T> {
  req: Request;
  res: Response;
  next: NextFunction;
  schema: ZodSchema<T>;
}
const handleValidatePostRequest = <T>({
  req,
  res,
  next,
  schema,
}: ValidatorType<T>) => {
  const { input } = req.body;
  const validate = schema.safeParse(input);
  if (!validate.success) {
    return res.status(400).json({ code: validate.error });
  }
  return next();
};

export const validateCreateCollection = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  handleValidatePostRequest({
    req,
    res,
    next,
    schema: validateCreateCollectionSchema,
  });

export const validateExecuteCode = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  handleValidatePostRequest({
    req,
    res,
    next,
    schema: validateExecuteCodeSchema,
  });

export const validateGetCollection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;
  const { offset, limit, keyword } = query as z.infer<
    typeof validateGetCollectionSchema
  >;
  const input = {
    offset: offset && Number(offset),
    limit: limit && Number(limit),
    keyword,
  };
  const validate = validateGetCollectionSchema.safeParse(input);
  if (!validate.success) {
    return res.status(400).json({ code: validate.error });
  }
  return next();
};
