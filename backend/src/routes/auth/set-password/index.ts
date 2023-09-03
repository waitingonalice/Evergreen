import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorEnum } from "~/constants/enum";
import { rest } from "~/utils";
import { setPasswordLimiter } from "./middleware/rateLimiter";
import { updateUserPassword, verifyUserData } from "./controllers";

export interface RequestBody {
  password: string;
  confirmPassword: string;
}

enum JwtErrorMessage {
  EXPIRED = "jwt expired",
  INVALID = "invalid token",
}

const router = rest.express.Router();

router.post(
  "/set-password/:token",
  setPasswordLimiter,
  async (req: Request, res: Response) => {
    try {
      const { password, confirmPassword } = req.body as RequestBody;
      const { token } = req.params;
      const decodedUserData = verifyUserData({
        password,
        confirmPassword,
        token,
      });
      await updateUserPassword(decodedUserData, confirmPassword);

      return res.status(200).json({ result: "ok" });
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        switch (err.message) {
          case JwtErrorMessage.INVALID:
            return res.status(400).json({ code: ErrorEnum.INVALID_TOKEN });
          case JwtErrorMessage.EXPIRED:
            return res.status(400).json({ code: ErrorEnum.EXPIRED_TOKEN });
          default:
            break;
        }
      }
      if (err instanceof Error)
        return res.status(400).json({ code: err.message });

      return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
    }
  }
);

export default router;
