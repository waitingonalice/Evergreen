import jwt from "jsonwebtoken";
import { ErrorEnum } from "~/constants/enum";
import { db } from "~/utils";

enum JwtErrorMessage {
  EXPIRED = "jwt expired",
  INVALID = "invalid signature",
}

interface DecodedType {
  data: {
    email: string;
    country: string;
  };
}

export const verify = async (token: string) => {
  const decoded = (process.env.SESSION_SECRET &&
    jwt.verify(token, process.env.SESSION_SECRET)) as DecodedType | undefined;
  const email = decoded?.data.email;
  const account = await db.account.findUnique({
    where: { email },
    select: { active: true },
  });
  try {
    // if account is not active and token is valid, verify the account by setting active to true
    if (!account?.active && email) {
      const data = await db.account.update({
        where: { email },
        data: { active: true },
        select: { email: true },
      });

      return data;
    }
    throw new Error(ErrorEnum.DUPLICATE_TOKEN);
  } catch (err) {
    const error = err as jwt.VerifyErrors;
    switch (error.message) {
      case JwtErrorMessage.INVALID:
        return { code: ErrorEnum.INVALID_TOKEN };
      case JwtErrorMessage.EXPIRED:
        if (!account?.active) {
          await db.account
            .delete({
              where: { email },
            })
            .catch((err) => console.error(err));
          return { code: ErrorEnum.EXPIRED_TOKEN };
        }
        break;
      default:
        return { code: ErrorEnum.INTERNAL_SERVER_ERROR };
    }
    if (err instanceof Error) return { code: err.message };
  }
  return { code: ErrorEnum.INTERNAL_SERVER_ERROR };
};
