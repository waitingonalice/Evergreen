import { Router } from "express";
import { verifyUser } from "~/middleware/verifyUser";
import * as UserController from "~/modules/user/controller";

export const UserRouter = Router();

UserRouter.get("/user", verifyUser, UserController.handleGetUser);
