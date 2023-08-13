import express from "express";
import { api } from "~/constants/routes";
import forgotPasswordRoute from "./forgot-password";
import loginRoute from "./login";
import refreshTokenRoute from "./refreshToken";
import registerRoute from "./register";
import setPasswordRoute from "./set-password";
import verifyRoute from "./verify";

export * from "./register/middleware/registerHash";
export * from "./verify/middleware/verifyToken";

const authenticationEndpoints = (app: ReturnType<typeof express>) => {
  app.use(api.auth, registerRoute);
  app.use(api.auth, verifyRoute);
  app.use(api.auth, loginRoute);
  app.use(api.auth, refreshTokenRoute);
  app.use(api.auth, forgotPasswordRoute);
  app.use(api.auth, setPasswordRoute);
};

export default authenticationEndpoints;
