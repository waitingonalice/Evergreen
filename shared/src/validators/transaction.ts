import z from "zod";
import { TransactionTypeEnum } from "../constant/enum";

export const transactionSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().max(800),
  amount: z
    .string()
    .min(1)
    .refine((val) => {
      if (!Number(val)) return false;
      return true;
    }, "Amount must be a number")
    .refine((val) => {
      const decimal = val.split(".")[1];
      if (decimal?.length > 2) return false;
      return true;
    }, "Amount must have 2 decimal places")
    .refine((val) => {
      const hasDecimal = val.includes(".");
      const decimal = val.split(".")[1];
      if (hasDecimal && !decimal?.length) return false;
      return true;
    }, "Invalid amount entered."),
  category: z.string().min(1),
  type: z.nativeEnum(TransactionTypeEnum),
});

export const arrayTransactionSchema = z.array(transactionSchema);

export const transactionAmountSchema = z.number().min(0.01).max(999999);
