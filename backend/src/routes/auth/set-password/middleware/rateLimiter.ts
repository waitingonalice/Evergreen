import { rateLimit } from "express-rate-limit";
import { ErrorEnum } from "~/constants/enum";

export const setPasswordLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 mins
  max: 1, // User is only allowed to use this api once which is sufficient per token duration. If user wants to reset password again, they have to request for a new token.
  handler: (_, res) =>
    res.status(429).json({ code: ErrorEnum.RESET_PASSWORD_ATTEMPTS_EXCEEDED }),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
