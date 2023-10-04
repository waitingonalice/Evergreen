import express from "express";
import { routes } from "~/constants/routes";
import AuthRouter from "./routes";

const authenticationEndpoints = (app: ReturnType<typeof express>) =>
  app.use(routes.auth, AuthRouter);

export default authenticationEndpoints;
