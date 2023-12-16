import { Router } from "express";
import * as AuthController from "~/modules/auth/controller";
import {
  createAccountLimiter,
  loginLimiter,
  setPasswordLimiter,
} from "~/modules/auth/middleware";

const AuthRouter = Router();

AuthRouter.post("/forgot-password", AuthController.handleForgotPassword);

AuthRouter.post("/login", loginLimiter, AuthController.handleLogin);

AuthRouter.get("/refresh-token", AuthController.handleRefreshToken);

AuthRouter.post(
  "/register",
  createAccountLimiter,
  AuthController.handleRegister
);

AuthRouter.post(
  "/set-password/:token",
  setPasswordLimiter,
  AuthController.handleSetPassword
);

AuthRouter.get("/verify/:token", AuthController.handleVerify);

export default AuthRouter;
