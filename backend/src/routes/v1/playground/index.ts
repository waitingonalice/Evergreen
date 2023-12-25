import { Router } from "express";
import { verifyUser } from "~/middleware/verifyUser";

export const PlaygroundRouter = Router();

PlaygroundRouter.get("/collections", verifyUser);
PlaygroundRouter.delete("/collections", verifyUser);
PlaygroundRouter.post("/collections", verifyUser);
