import z from "zod";

export const verifyCreateCollectionSchema = z.string().min(1);

export const verifyExecuteCodeSchema = z.object({
  code: z.string().min(1),
  languageId: z.number().min(1),
});
