import { verifyCreateCollectionSchema } from "@expense-tracker/shared";
import { z } from "zod";

export interface CreateCollectionBody {
  input: z.infer<typeof verifyCreateCollectionSchema>;
}
