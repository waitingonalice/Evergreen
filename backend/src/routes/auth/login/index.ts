import { Request, Response } from "express";
import { ErrorEnum } from "~/constants/enum";
import { rest } from "~/utils";
import { loginLimiter } from "./middleware/rateLimiter";
import { generateTokens, verifyCredentials } from "./controllers";

export type InputValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const router = rest.express.Router();

router.post("/login", loginLimiter, async (req: Request, res: Response) => {
  try {
    const input = req.body as InputValues;
    const user = await verifyCredentials(input);
    const { auth, refresh } = generateTokens(input, user);
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
