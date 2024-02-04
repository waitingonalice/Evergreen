import { ErrorEnum } from "@expense-tracker/shared";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import { z } from "zod";
import { UserType } from "~/types/account";

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

export const passwordHash = async (password: string) =>
  bcrypt.hash(password, 10);

export const sendEmailVerification = async (
  to: string,
  template: string,
  subject = "Email verification"
) => {
  const transporter = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SUPPORT_EMAIL_ADDRESS,
      pass: process.env.SUPPORT_EMAIL_PASSWORD,
    },
  });
  transporter.sendMail(
    {
      from: process.env.SUPPORT_EMAIL_ADDRESS,
      to,
      subject,
      html: template,
    },
    (error, info) => {
      if (error) throw error;
      console.log("Email Sent Successfully");
      console.log(info);
    }
  );
};

export const generateAuthToken = (user: UserType, secret: string) => {
  const { id: userId, active } = user;
  const auth = jwt.sign(
    {
      data: {
        userId,
        verified: active,
      },
    },
    secret,
    { expiresIn: "1h" }
  );
  return auth;
};

export const generateRefreshToken = (
  user: UserType,
  rememberMe: boolean,
  secret: string
) => {
  const { id } = user;
  const refresh = jwt.sign(
    {
      data: {
        id,
        rememberMe,
      },
    },
    secret
  );

  return refresh;
};
