import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ErrorEnum } from "~/constants/enum";
import {
  generateAuthToken,
  generateRefreshToken,
} from "~/middleware/generateToken";
import { Rest, db } from "~/utils";
import { loginLimiter } from "./middleware/rateLimiter";

export type InputValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const router = Rest.express.Router();

router.post("/login", loginLimiter, async (req: Request, res: Response) => {
  try {
    const input = req.body as InputValues;
    const user = await db.account.findUnique({
      where: { email: input.email },
    });
    if (!user) throw new Error(ErrorEnum.INVALID_LOGIN_CRED);

    if (user && !user.active) throw new Error(ErrorEnum.EMAIL_NOT_VERIFIED);

    const passwordMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordMatch) throw new Error(ErrorEnum.INVALID_LOGIN_CRED);

    if (!process.env.SESSION_SECRET) throw new Error("SESSION_SECRET not set");
    const auth = generateAuthToken(user, process.env.SESSION_SECRET);
    const refresh = generateRefreshToken(
      user,
      input.rememberMe,
      process.env.SESSION_SECRET
    );
    return res.status(200).json({
      result: {
        tokens: {
          auth,
          refresh,
        },
        id: user.id,
        country: user.country,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ code: error.message });
    return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
  }
});

export default router;
