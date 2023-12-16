import { Router } from "express";
import { verifyUser } from "~/middleware/verifyUser";
import * as TransactionController from "~/modules/transaction/controller";
import * as TransactionMiddleware from "~/modules/transaction/middleware";

export const TransactionRouter = Router();

TransactionRouter.post(
  "/transactions",
  verifyUser,
  TransactionMiddleware.validateCreateTransactions,
  TransactionController.handleCreateTransactions
);

TransactionRouter.get(
  "/transaction/:id",
  verifyUser,
  TransactionMiddleware.validateTransactionId,
  TransactionController.handleGetTransactionById
);

TransactionRouter.get(
  "/transactions",
  verifyUser,
  TransactionController.handleGetTransactions
);

TransactionRouter.get(
  "/transactions/search",
  verifyUser,
  TransactionController.handleSearchTransactions
);

// TransactionRouter.put(
//   "/transaction/:id",
//   verifyUser,
//   TransactionController.updateTransactionById
// );

// TransactionRouter.delete(
//   "/transaction/:id",
//   verifyUser,
//   TransactionController.deleteTransactionById
// );
