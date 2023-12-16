import { rateLimit } from "express-rate-limit";
import { ErrorEnum } from "~/constants/enum";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10, // Limit each IP to 50 login requests per `window` (here, per 15 mins)
  handler: (_, res) =>
    res.status(429).json({ code: ErrorEnum.LOGIN_ATTEMPTS_EXCEEDED }),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 2, // Limit each IP to 2 account per `window` (here, per 15 mins)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (_, res) =>
    res
      .status(429)
      .json({ code: ErrorEnum.ACCOUNT_CREATION_ATTEMPTS_EXCEEDED }),
});

export const setPasswordLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 mins
  max: 1, // User is only allowed to use this api once which is sufficient per token duration. If user wants to reset password again, they have to request for a new token.
  handler: (_, res) =>
    res.status(429).json({ code: ErrorEnum.RESET_PASSWORD_ATTEMPTS_EXCEEDED }),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
