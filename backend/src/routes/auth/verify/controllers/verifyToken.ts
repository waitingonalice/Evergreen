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
  try {
    const decoded = (process.env.SESSION_SECRET &&
      jwt.verify(token, process.env.SESSION_SECRET)) as DecodedType | undefined;
    const email = decoded?.data.email || "";
    const account = await db.account.findUnique({
      where: { email },
      select: { active: true },
    });
    if (account?.active) {
      throw new Error(ErrorEnum.DUPLICATE_TOKEN);
    } else if (email) {
      const data = await db.account.update({
        where: { email },
        data: { active: true },
        select: { email: true },
      });
      return data;
    }
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError)
      switch (err.message) {
        case JwtErrorMessage.INVALID:
          return { code: ErrorEnum.INVALID_TOKEN };
        case JwtErrorMessage.EXPIRED:
          return { code: ErrorEnum.EXPIRED_TOKEN };
        default:
          break;
      }
    if (err instanceof Error) return { code: err.message };
  }
  return { code: ErrorEnum.INTERNAL_SERVER_ERROR };
};
