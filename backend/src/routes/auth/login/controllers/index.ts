import bcrypt from "bcrypt";
import { ErrorEnum } from "~/constants/enum";
import { generateAuthToken, generateRefreshToken } from "~/controllers/auth";
import { db } from "~/utils";

export type InputValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export const verifyCredentials = async (input: InputValues) => {
  const user = await db.account.findUnique({
    where: { email: input.email },
  });
  if (!user) throw new Error(ErrorEnum.INVALID_LOGIN_CRED);

  if (user && !user.active) throw new Error(ErrorEnum.EMAIL_NOT_VERIFIED);

  const passwordMatch = await bcrypt.compare(input.password, user.password);
  if (!passwordMatch) throw new Error(ErrorEnum.INVALID_LOGIN_CRED);
  return user;
};

export const generateTokens = (
  input: InputValues,
  user: Awaited<ReturnType<typeof verifyCredentials>>
) => {
  if (!process.env.SESSION_SECRET) throw new Error("SESSION_SECRET not set");
  const auth = generateAuthToken(user, process.env.SESSION_SECRET);
  const refresh = generateRefreshToken(
    user,
    input.rememberMe,
    process.env.SESSION_SECRET
  );
  return { auth, refresh };
};
