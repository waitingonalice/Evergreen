import { Router } from "express";
import { routes } from "~/constants/routes";
import { TransactionRouter } from "./transaction";

export const V1Router = Router();

V1Router.use(routes.api.user, TransactionRouter);
