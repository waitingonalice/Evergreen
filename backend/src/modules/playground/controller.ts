import { Request, Response } from "express";
import CollectionModel from "~/models/collection";
import { Env } from "~/utils";
import { toBase64 } from "~/utils/formatting";
import { tryCatch } from "~/utils/tryCatch";
import {
  CreateCollectionBody,
  ExecuteCodeBody,
  ExecuteCodeResponse,
  GetExecutedResultType,
  GetJudgeResultType,
} from "./types";
import { rapidAPIHeaders } from "./utils";

export const handleCreateCollection = tryCatch(
  async (req: Request, res: Response) => {
    const { accountId } = res.locals;
    const { input }: CreateCollectionBody = req.body;
    const collection = await CollectionModel.createCollection({
      input,
      id: accountId,
    });
    return res.status(200).json({ result: collection.code });
  }
);

export const handleGetCollections = tryCatch(
  async (req: Request, res: Response) => {
    const { limit = 10, offset = 0, keyword = "" } = req.query;
    const { accountId } = res.locals;
    const data = await CollectionModel.getCollections({
      id: accountId,
      keyword: keyword as string,
      limit: Number(limit),
      offset: Number(offset),
    });
    return res.status(200).json(data);
  }
);

export const handleDeleteCollection = tryCatch(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCollection = await CollectionModel.deleteCollection(id);
    return res.status(200).json({ result: deletedCollection });
  }
);

export const handleExecuteCode = tryCatch(
  async (req: Request, res: Response) => {
    const { input }: ExecuteCodeBody = req.body;
    const { languageId, code } = input;
    const encode = toBase64(code);
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
    return res.status(200).json({ result: response.token });
  }
);

export const handleGetExecutionResult = tryCatch(
  async (req: Request, res: Response) => {
    const { token } = req.params;
    const response: GetExecutedResultType = {
      output: null,
      status: "COMPILING",
    };
    const initOutput = {
      time: null,
      memory: null,
      stdout: null,
      stderr: null,
    };

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
  }
);
