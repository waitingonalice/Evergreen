import { rateLimit } from "express-rate-limit";

export const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 2, // Limit each IP to 2 account per `window` (here, per 15 mins)
  message:
    "Too many account creations within a certain timeframe, please try again after 15 mins",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
