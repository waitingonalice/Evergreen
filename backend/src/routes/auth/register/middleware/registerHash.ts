import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ErrorEnum } from "~/constants/enum";
import { db } from "~/utils";

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
  const hash = confirmPassword && (await bcrypt.hash(confirmPassword, 10));

  const account = await db.account.create({
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
