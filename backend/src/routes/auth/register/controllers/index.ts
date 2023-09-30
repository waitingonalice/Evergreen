import jwt from "jsonwebtoken";
import { z } from "zod";
import { ErrorEnum } from "~/constants/enum";
import { passwordHash } from "~/controllers/auth";
import { prisma } from "~/db";

export type RegisterProps = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  country: string;
};

export const register = async (input: RegisterProps) => {
  const { email, country, firstName, lastName, confirmPassword } = input;
  const token =
    process.env.SESSION_SECRET &&
    jwt.sign({ data: { email, country } }, process.env.SESSION_SECRET, {
      expiresIn: "24h",
    });
  if (!token) throw new Error(ErrorEnum.INTERNAL_SERVER_ERROR);
  const hash = await passwordHash(confirmPassword);

  const account = await prisma.account.create({
    data: {
      email,
      country,
      firstName,
      lastName,
      password: hash,
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      country: true,
    },
  });
  if (!account) throw new Error(ErrorEnum.CREATION_ACCOUNT_FAILED);
  return { account, token };
};

export const registrationSchema = z
  .object({
    email: z.string().min(1).email({ message: ErrorEnum.INVALID_EMAIL }),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
    country: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ErrorEnum.PASSWORD_MISMATCH,
    path: ["confirmPassword"],
  });
