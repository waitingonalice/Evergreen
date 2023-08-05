import { z } from "zod";
import { ErrorEnum } from "~/constants/enum";

export const registrationSchema = z
  .object({
    email: z.string().min(1).email({ message: ErrorEnum.INVALID_EMAIL }),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ErrorEnum.PASSWORD_MISMATCH,
    path: ["confirmPassword"],
  });
