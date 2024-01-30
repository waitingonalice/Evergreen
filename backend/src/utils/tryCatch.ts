/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";

export const tryCatch =
  (
    controller: (
      req: Request,
      res: Response
    ) => Promise<Response<Record<string, unknown>>>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
