import { Request, Response } from "express";
import { prisma } from "~/db";
import { CreateCollectionBody } from "./types";

export const handleCreateCollection = async (req: Request, res: Response) => {
  const { accountId } = res.locals;
  const { input }: CreateCollectionBody = req.body;
  try {
    const collection = await prisma.playground.create({
      data: {
        code: input,
        account_id: accountId,
      },
      select: {
        code: true,
      },
    });
    return res.status(200).json({ result: collection.code });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ code: "500000", errors: err });
  }
};

export const handleGetCollections = async (req: Request, res: Response) => {
  res.json({ result: "hello" });
};

export const handleDeleteCollection = async (req: Request, res: Response) => {
  res.json({ result: "hello" });
};

export const handleExecuteCode = async (req: Request, res: Response) => {
  res.json({ result: "hello" });
};
