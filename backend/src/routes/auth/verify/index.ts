import { Request, Response } from "express";
import { Rest } from "~/utils";
import { verify } from "./middleware/verifyToken";

const router = Rest.express.Router();

router.get("/verify/:token", async (req: Request, res: Response) => {
  const jwtToken = req.params.token;
  const data = await verify(jwtToken);
  return res.json({ data });
});

export default router;
