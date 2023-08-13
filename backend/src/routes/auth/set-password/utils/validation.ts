import z from "zod";

export const passwordSchema = z
  .object({
    password: z
      .string({ required_error: "Password cannot be empty" })
      .min(1)
      .min(8)
      .max(14),
    confirmPassword: z
      .string({ required_error: "Confirm Password cannot be empty" })
      .min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password mismatch",
    path: ["confirmPassword"],
  });
