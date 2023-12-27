import z from "zod";

export const verifyCreateCollectionSchema = z.string().min(1);
