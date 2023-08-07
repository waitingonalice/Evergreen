import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ErrorEnum } from "~/constants/enum";
import { Rest, db } from "~/utils";
import { generateToken } from "./middleware/generateToken";

export type InputValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const router = Rest.express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const input = req.body as InputValues;
    const user = await db.account.findUnique({
      where: { email: input.email },
    });
    if (!user) throw new Error(ErrorEnum.INVALID_LOGIN_CRED);
    if (user && !user.active) throw new Error(ErrorEnum.EMAIL_NOT_VERIFIED);
    // TODO: fix comparator
    const passwordMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordMatch) throw new Error(ErrorEnum.INVALID_LOGIN_CRED);
    const tokens = generateToken(user);
    return res.status(200).json({ data: tokens });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ code: error.message });
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
});

export default router;
