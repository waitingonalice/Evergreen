import jwt from "jsonwebtoken";
import { ErrorEnum } from "~/constants/enum";
import { db } from "~/utils";
import { register } from "../../register/middleware/registerHash";

enum JwtErrorMessage {
  EXPIRED = "jwt expired",
  INVALID = "invalid signature",
}

type RegisterDataType = Awaited<ReturnType<typeof register>>;

const findAccountByToken = async (token: RegisterDataType["token"]) => {
  const account = await db.account.findUnique({
    where: {
      token,
    },
    select: { email: true, active: true },
  });
  if (!account) throw new Error(ErrorEnum.EMAIL_NOT_FOUND);
  return account;
};

export const verify = async (confirmationCode: RegisterDataType["token"]) => {
  const account = await findAccountByToken(confirmationCode);
  try {
    const decoded =
      process.env.SESSION_SECRET &&
      jwt.verify(confirmationCode, process.env.SESSION_SECRET);

    // if account is not active and token is valid, verify the account by setting active to true
    if (!account?.active && decoded) {
      const data = await db.account.update({
        where: { email: account?.email },
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
              where: { token: confirmationCode },
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
