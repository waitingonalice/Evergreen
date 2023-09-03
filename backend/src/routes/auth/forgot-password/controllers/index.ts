import jwt from "jsonwebtoken";
import { z } from "zod";
import { ErrorEnum } from "~/constants/enum";
import { sendEmailVerification } from "~/controllers/auth";
import { forgotPasswordTemplate } from "~/template/forgot-password";
import { db } from "~/utils";

const emailSchema = z.string().email({ message: ErrorEnum.INVALID_EMAIL });

export const verifyUserByEmail = async (email: string) => {
  const result = emailSchema.safeParse(email);
  if (!result.success) throw new Error(result.error.errors[0].message);
  const user = await db.account.findUnique({ where: { email } });
  if (!user) throw new Error(ErrorEnum.INVALID_EMAIL);
  return user;
};

export const generateTokenAndSendEmailTemplate = async (
  user: Awaited<ReturnType<typeof verifyUserByEmail>>
) => {
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
};
