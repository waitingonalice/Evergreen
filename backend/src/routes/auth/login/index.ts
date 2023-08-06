/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { Rest } from "~/utils";

const router = Rest.express.Router();

router.post("/login", async (req: Request, res: Response) => {});
