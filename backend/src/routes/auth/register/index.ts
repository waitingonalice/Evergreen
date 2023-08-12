import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ErrorEnum } from "~/constants/enum";
import { sendEmailVerification } from "~/middleware/emailVerification";
import { emailVerificationTemplate } from "~/template/verify";
import { Rest } from "~/utils";
import { createAccountLimiter } from "./middleware/rateLimiter";
import { RegisterProps, register } from "./middleware/registerHash";
import { registrationSchema } from "./utils/validation";

const router = Rest.express.Router();

router.post(
  "/register",
  createAccountLimiter,
  async (req: Request, res: Response) => {
    const requestBody: RegisterProps = req.body;
    try {
      const validate = registrationSchema.safeParse(requestBody);
      // always display the first error in the list
      if (!validate.success) throw new Error(validate.error.errors[0].message);

      const registerData = await register(requestBody);
      await sendEmailVerification(
        registerData.account.email,
        emailVerificationTemplate(
          registerData.account.firstName,
          `${process.env.DOMAIN_URL}/verify?code=${registerData.token}`
        )
      );
      return res.json({
        result: registerData,
      });
    } catch (err: unknown) {
      // to catch prisma errors
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case "P2002":
            return res.status(400).json({ code: ErrorEnum.DUPLICATE_EMAIL });
          default:
            return res.status(500).json({ code: err.message });
        }
      } else if (err instanceof Error)
        return res.status(400).json({ code: err.message });
      return res.status(500).json({ code: ErrorEnum.INTERNAL_SERVER_ERROR });
    }
  }
);

export default router;
