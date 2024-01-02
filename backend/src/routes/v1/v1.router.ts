import { Router } from "express";
import { PlaygroundRouter } from "./playground";

export const V1Router = Router();

V1Router.use(PlaygroundRouter);
