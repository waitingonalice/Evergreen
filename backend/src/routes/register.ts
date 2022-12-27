import type { Request, Response } from "express";
import { Rest } from "~/utils";

const router = Rest.express.Router();

router.post("/", (req: Request, res: Response) => {
  return res.json({ test: 1 });
});

export { router as registerRoute };
