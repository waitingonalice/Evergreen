import express from "express";
import { api } from "~/constants/routes";
import { loginLimiter } from "./login/middleware/rateLimiter";
import { createAccountLimiter } from "./register/middleware/rateLimiter";
import loginRoute from "./login";
import registerRoute from "./register";
import verifyRoute from "./verify";

export * from "./register/middleware/registerHash";
export * from "./verify/middleware/verifyToken";
export * from "./register/middleware/emailVerification";

const authenticationEndpoints = (app: ReturnType<typeof express>) => {
  app.use(api.auth, createAccountLimiter, registerRoute);
  app.use(api.auth, verifyRoute);
  app.use(api.auth, loginLimiter, loginRoute);
};

export default authenticationEndpoints;
