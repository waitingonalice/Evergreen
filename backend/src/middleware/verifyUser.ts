/* eslint-disable no-console */
import { ErrorEnum } from "@expense-tracker/shared";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { DecodedAuthTokenType } from "~/types/account";
import { jwtDecode } from "~/utils";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error(ErrorEnum.UNAUTHORIZED);
    const userData = jwtDecode<DecodedAuthTokenType>(token);
    res.locals.accountId = userData.data.userId;
    return next();
  } catch (err) {
    console.error(err);
    if (err instanceof Error || err instanceof jwt.TokenExpiredError)
      return res.status(401).json({ code: err.message });
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
};
