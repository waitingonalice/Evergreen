import { Router } from "express";
import { verifyUser } from "~/middleware/verifyUser";
import * as PlaygroundController from "~/modules/playground/controller";
import * as PlaygroundValidator from "~/modules/playground/middleware";

export const PlaygroundRouter = Router();

PlaygroundRouter.get(
  "/collections",
  verifyUser,
  PlaygroundController.handleGetCollections
);

PlaygroundRouter.delete(
  "/collections",
  verifyUser,
  PlaygroundController.handleDeleteCollection
);

PlaygroundRouter.post(
  "/collections",
  verifyUser,
  PlaygroundValidator.verifyCreateCollection,
  PlaygroundController.handleCreateCollection
);
