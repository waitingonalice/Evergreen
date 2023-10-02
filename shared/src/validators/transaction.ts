import z from "zod";

export const transactionSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(2000),
  amount: z.number().min(0.01).max(999999.99),
  type: z.string().min(1).max(20),
});
