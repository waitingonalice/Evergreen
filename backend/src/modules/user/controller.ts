import { Request, Response } from "express";
import User from "~/models/user";
import { tryCatch } from "~/utils";

export const handleGetUser = tryCatch(async (_: Request, res: Response) => {
  const { accountId } = res.locals;
  const user = await new User(accountId).getUser();
  return res.status(200).json({ result: user });
});
