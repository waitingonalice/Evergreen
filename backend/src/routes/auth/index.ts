import express from "express";
import { routes } from "~/constants/routes";
import forgotPasswordRoute from "./forgot-password";
import loginRoute from "./login";
import refreshTokenRoute from "./refreshToken";
import registerRoute from "./register";
import setPasswordRoute from "./set-password";
import verifyRoute from "./verify";

const authenticationEndpoints = (app: ReturnType<typeof express>) => {
  app.use(routes.auth, registerRoute);
  app.use(routes.auth, verifyRoute);
  app.use(routes.auth, loginRoute);
  app.use(routes.auth, refreshTokenRoute);
  app.use(routes.auth, forgotPasswordRoute);
  app.use(routes.auth, setPasswordRoute);
};

export default authenticationEndpoints;
