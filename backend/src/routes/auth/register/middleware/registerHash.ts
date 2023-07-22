import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ErrorEnum } from "~/constants/enum";
import { db } from "~/utils";

export type RegisterProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
};

export const register = async (input: RegisterProps) => {
  const { email, country } = input;
  const token =
    process.env.SESSION_SECRET &&
    jwt.sign({ data: { email, country } }, process.env.SESSION_SECRET, {
      expiresIn: "24h",
    });
  const hash = await bcrypt.hash(input.password, 10);

  const createAccount = await db.account.create({
    data: { ...input, password: hash, token: token ?? "" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      country: true,
      token: true,
    },
  });
  if (!createAccount) throw new Error(ErrorEnum.CREATION_ACCOUNT_FAILED);
  return createAccount;
};
