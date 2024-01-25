import { ErrorMessage } from "@expense-tracker/shared";
import { Request, Response } from "express";
import { prisma } from "~/db";
import { Env } from "~/utils";
import { toBase64 } from "~/utils/formatting";
import {
  CreateCollectionBody,
  ExecuteCodeBody,
  ExecuteCodeResponse,
  GetExecutedResultType,
  GetJudgeResultType,
} from "./types";
import { rapidAPIHeaders } from "./utils";

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
  const { input }: ExecuteCodeBody = req.body;
  const { languageId, code } = input;
  const encode = toBase64(code);

  try {
    const response = (await fetch(
      `${Env.CODE_JUDGE}/submissions/?base64_encoded=true&fields=*`,
      {
        method: "POST",
        body: JSON.stringify({
          language_id: languageId,
          source_code: encode,
        }),
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          ...rapidAPIHeaders,
        },
      }
    ).then((res) => res.json())) as ExecuteCodeResponse;

    console.log("User", res.locals.accountId, "Result", response);

    return res.status(200).json({ result: response.token });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(400).json({ code: err.message });
    }
    return res.status(500).json({ code: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export const handleGetExecutionResult = async (req: Request, res: Response) => {
  const { token } = req.params;
  const response: GetExecutedResultType = { output: null, status: "COMPILING" };
  const initOutput = {
    time: null,
    memory: null,
    stdout: null,
    stderr: null,
  };
  try {
    const getExecutionResult = (await fetch(
      `${Env.CODE_JUDGE}/submissions/${token}?base64_encoded=true&fields=*`,
      {
        method: "GET",
        headers: {
          ...rapidAPIHeaders,
        },
      }
    ).then((res) => res.json())) as GetJudgeResultType;
    const { status } = getExecutionResult;

    console.log("User", res.locals.accountId, "Result", getExecutionResult);

    switch (status.id) {
      case 1:
        response.status = "COMPILING";
        break;
      case 2:
        response.status = "PENDING";
        break;
      case 3:
        response.status = "FINISHED";
        response.output = {
          ...initOutput,
          time: getExecutionResult.time,
          memory: getExecutionResult.memory,
          stdout: getExecutionResult.stdout,
        };
        break;
      default:
        response.status = "ERROR";
        response.output = {
          ...initOutput,
          stderr: getExecutionResult.status.description,
        };
        break;
    }
    return res.status(200).json({ result: response });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(400).json({ code: err.message });
    }
    return res.status(500).json({ code: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};
