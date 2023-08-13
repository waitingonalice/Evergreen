import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorEnum } from "~/constants/enum";
import { sendEmailVerification } from "~/middleware/emailVerification";
import { setPasswordTemplate } from "~/template/set-password";
import { db, rest } from "~/utils";
import { passwordHash } from "~/utils/auth";
import { setPasswordLimiter } from "./middleware/rateLimiter";
import { passwordSchema } from "./utils/validation";

interface RequestBody {
  password: string;
  confirmPassword: string;
}

interface JwtPayload {
  data: {
    id: string;
  };
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
      const validate = passwordSchema.safeParse({ password, confirmPassword });
      if (!validate.success) throw new Error(validate.error.errors[0].message);

      if (!process.env.SESSION_SECRET)
        throw new Error("SESSION_SECRET is not defined");

      const decoded = jwt.verify(token, process.env.SESSION_SECRET) as
        | JwtPayload
        | undefined;
      if (!decoded) throw new Error(ErrorEnum.INVALID_TOKEN);

      const hashPassword = await passwordHash(confirmPassword);

      const user = await db.account.update({
        where: { id: decoded?.data.id },
        data: { password: hashPassword },
        select: { firstName: true, email: true },
      });

      if (!user) throw new Error(ErrorEnum.INTERNAL_SERVER_ERROR);

      await sendEmailVerification(
        user.email,
        setPasswordTemplate(user.firstName, `${process.env.DOMAIN_URL}/login`)
      );

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
