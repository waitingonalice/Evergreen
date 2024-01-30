import { Router } from "express";
import { verifyUser } from "~/middleware/verifyUser";
import * as PlaygroundController from "~/modules/playground/controller";
import * as PlaygroundValidator from "~/modules/playground/middleware";

export const PlaygroundRouter = Router();

PlaygroundRouter.get(
  "/collections",
  verifyUser,
  PlaygroundValidator.validateGetCollection,
  PlaygroundController.handleGetCollections
);

PlaygroundRouter.delete(
  "/collections/:id",
  verifyUser,
  PlaygroundController.handleDeleteCollection
);

PlaygroundRouter.post(
  "/collections",
  verifyUser,
  PlaygroundValidator.validateCreateCollection,
  PlaygroundController.handleCreateCollection
);

PlaygroundRouter.post(
  "/execute",
  verifyUser,
  PlaygroundValidator.validateExecuteCode,
  PlaygroundController.handleExecuteCode
);

PlaygroundRouter.get(
  "/execute/:token",
  verifyUser,
  PlaygroundController.handleGetExecutionResult
);
