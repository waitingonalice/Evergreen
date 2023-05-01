/* eslint-disable no-console */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import { RegisterProps, RegisterDataType } from "~/types/register";
import { db } from "~/utils";

enum JwtErrorMessage {
  EXPIRED = "jwt expired",
  INVALID = "invalid signature",
}

export const register = async (input: RegisterProps) => {
  const { email, country } = input;
  const token =
    process.env.SESSION_SECRET &&
    jwt.sign({ data: { email, country } }, process.env.SESSION_SECRET, {
      expiresIn: "24h",
    });
  const hash = await bcrypt.hash(input.password, 10);
  const createAccount = await db.account.create({
    data: { ...input, password: hash, token: token ?? "" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      country: true,
      token: true,
    },
  });
  return createAccount;
};

export const sendEmailVerification = async (
  registeredData: RegisterDataType
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
      to: registeredData.email,
      subject: "Email verification",
      html: `<h1>Email Confirmation for Expense Tracker</h1>
        <h2>Hello ${registeredData.firstName}</h2>
        <p>Thank you for registering. Please confirm your email by clicking on the following link below.</p>
        <a href=http://localhost:3000/verify?code=${registeredData.token}> Click here</a>
        </div>`,
    },
    (error, info) => {
      if (error) throw error;
      console.log("Email Sent Successfully");
      console.log(info);
    }
  );
};

const findAccountByToken = async (token: RegisterDataType["token"]) => {
  const account = await db.account.findUnique({
    where: {
      token,
    },
    select: { email: true, active: true },
  });
  return account;
};

export const verify = async (confirmationCode: RegisterDataType["token"]) => {
  const account = await findAccountByToken(confirmationCode);
  try {
    const decoded =
      process.env.SESSION_SECRET &&
      jwt.verify(confirmationCode, process.env.SESSION_SECRET);

    // if account is not active and token is valid, verify the account by setting active to true
    if (!account?.active && decoded) {
      await db.account.update({
        where: { email: account?.email },
        data: { active: true },
      });
      return "Verification success!";
    }
    return "This account has already been verified.";
  } catch (err) {
    const error = err as jwt.VerifyErrors;
    switch (error.message) {
      case JwtErrorMessage.INVALID:
        return { message: "401001" };
      case JwtErrorMessage.EXPIRED:
        if (!account?.active) {
          await db.account
            .delete({
              where: { token: confirmationCode },
            })
            .catch((err) => console.error(err));
          return "403001";
        }
        break;
      default:
    }
  }
  return "404001";
};
