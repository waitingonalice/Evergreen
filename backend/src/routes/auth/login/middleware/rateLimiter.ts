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
