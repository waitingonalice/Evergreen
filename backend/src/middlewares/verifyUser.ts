/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorEnum } from "~/constants/enum";

const validate = (token: string) => {
  if (!process.env.SESSION_SECRET)
    throw new Error("SESSION_SECRET is not defined");
  jwt.verify(token, process.env.SESSION_SECRET);
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error(ErrorEnum.UNAUTHORIZED);
    validate(token);
    return next();
  } catch (err) {
    console.error(err);
    if (err instanceof Error || err instanceof jwt.TokenExpiredError)
      return res.status(401).json({ code: err.message });
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
};
