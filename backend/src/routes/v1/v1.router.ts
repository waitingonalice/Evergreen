import { Router } from "express";
import { PlaygroundRouter } from "./playground";
import { UserRouter } from "./user";

export const V1Router = Router();

V1Router.use(PlaygroundRouter);
V1Router.use(UserRouter);
