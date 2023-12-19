import { arrayTransactionSchema } from "@expense-tracker/packages";
import { z } from "zod";

export type CreateTransactionRequestBody = {
  variables: z.infer<typeof arrayTransactionSchema>;
};

export type BalanceHistory = {
  total_income: string;
  total_expense: string;
  total: string;
};
