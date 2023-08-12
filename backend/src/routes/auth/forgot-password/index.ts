import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import { ErrorEnum } from "~/constants/enum";
import { sendEmailVerification } from "~/middleware/emailVerification";
import { forgotPasswordTemplate } from "~/template/forgot-password";
import { Rest, db } from "~/utils";

interface RequestBody {
  email: string;
}

const emailSchema = z.string().email({ message: ErrorEnum.INVALID_EMAIL });

const router = Rest.express.Router();

router.post("/forgot-password", async (req: Request, res: Response) => {
  const { email }: RequestBody = req.body;
  try {
    const result = emailSchema.safeParse(email);
    if (!result.success) throw new Error(result.error.errors[0].message);
    const user = await db.account.findUnique({ where: { email } });
    if (!user) throw new Error(ErrorEnum.INVALID_EMAIL);

    const token =
      process.env.SESSION_SECRET &&
      jwt.sign({ data: { id: user.id } }, process.env.SESSION_SECRET, {
        expiresIn: "30min",
      });

    await sendEmailVerification(
      user.email,
      forgotPasswordTemplate(
        user.firstName,
        `${process.env.DOMAIN_URL}/set-password?code=${token}`
      ),
      "Reset password"
    );
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
