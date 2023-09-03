import { Request, Response } from "express";
import { ErrorEnum } from "~/constants/enum";
import { rest } from "~/utils";
import {
  generateTokenAndSendEmailTemplate,
  verifyUserByEmail,
} from "./controllers";

interface RequestBody {
  email: string;
}

const router = rest.express.Router();

router.post("/forgot-password", async (req: Request, res: Response) => {
  const { email }: RequestBody = req.body;
  try {
    const user = await verifyUserByEmail(email);
    await generateTokenAndSendEmailTemplate(user);
    return res.status(200).json({ result: "ok" });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(400).json({ code: err.message });
    }
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
});

export default router;
