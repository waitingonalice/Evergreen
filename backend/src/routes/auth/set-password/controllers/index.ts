import jwt from "jsonwebtoken";
import z from "zod";
import { ErrorEnum } from "~/constants/enum";
import { passwordHash, sendEmailVerification } from "~/controllers/auth";
import { setPasswordTemplate } from "~/template/set-password";
import { db } from "~/utils";
import { RequestBody } from "..";

export const passwordSchema = z
  .object({
    password: z
      .string({ required_error: "Password cannot be empty" })
      .min(1)
      .min(8)
      .max(14),
    confirmPassword: z
      .string({ required_error: "Confirm Password cannot be empty" })
      .min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password mismatch",
    path: ["confirmPassword"],
  });

interface JwtPayload {
  data: {
    id: string;
  };
}

export const verifyUserData = ({
  password,
  confirmPassword,
  token,
}: RequestBody & { token: string }) => {
  const validate = passwordSchema.safeParse({ password, confirmPassword });
  if (!validate.success) throw new Error(validate.error.errors[0].message);

  if (!process.env.SESSION_SECRET)
    throw new Error("SESSION_SECRET is not defined");

  const decoded = jwt.verify(token, process.env.SESSION_SECRET) as
    | JwtPayload
    | undefined;
  if (!decoded) throw new Error(ErrorEnum.INVALID_TOKEN);
  return decoded;
};

export const updateUserPassword = async (
  decodedToken: JwtPayload,
  confirmPassword: string
) => {
  const hashPassword = await passwordHash(confirmPassword);
  const user = await db.account.update({
    where: { id: decodedToken?.data.id },
    data: { password: hashPassword },
    select: { firstName: true, email: true },
  });

  if (!user) throw new Error(ErrorEnum.INTERNAL_SERVER_ERROR);

  await sendEmailVerification(
    user.email,
    setPasswordTemplate(user.firstName, `${process.env.DOMAIN_URL}/login`)
  );
};
