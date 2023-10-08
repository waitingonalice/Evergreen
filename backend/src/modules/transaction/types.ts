import { arrayTransactionSchema } from "@expense-tracker/shared";
import { z } from "zod";

export type CreateTransactionRequestBody = {
  variables: z.infer<typeof arrayTransactionSchema>;
};
