import { z } from "zod";
import { ErrorEnum } from "~/constants/enum";

export const emailSchema = z
  .string()
  .email({ message: ErrorEnum.INVALID_EMAIL });

export const registrationSchema = z
  .object({
    email: z.string().min(1).email({ message: ErrorEnum.INVALID_EMAIL }),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
    country: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ErrorEnum.PASSWORD_MISMATCH,
    path: ["confirmPassword"],
  });

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
