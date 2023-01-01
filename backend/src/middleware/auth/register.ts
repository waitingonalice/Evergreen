import { db } from "~/utils";
import { RegisterProps, RegisterDataType } from "~/types/register";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";

enum JwtErrorMessage {
  EXPIRED = "jwt expired",
  INVALID = "invalid signature",
}

export const register = async (input: RegisterProps) => {
  const token =
    process.env.SESSION_SECRET &&
    jwt.sign({ data: input.email }, process.env.SESSION_SECRET, {
      expiresIn: "1s",
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
    function (error, info) {
      if (error) throw error;
      console.log("Email Sent Successfully");
      console.log(info);
    }
  );
};

export const verify = async (confirmationCode: RegisterDataType["token"]) => {
  const response = { verified: false, message: "401001" };
  const account = await findAccountByToken(confirmationCode);
  try {
    const decoded =
      process.env.SESSION_SECRET &&
      jwt.verify(confirmationCode, process.env.SESSION_SECRET);
    if (!account?.active && decoded) {
      await db.account.update({
        where: { email: account?.email },
        data: { active: true },
      });
      return {
        ...response,
        verified: true,
        message: "Verification success!",
      };
    }
    return {
      ...response,
      verified: true,
      message: "This account has already been verified.",
    };
  } catch (err) {
    const error = err as jwt.VerifyErrors;
    switch (error.message) {
      case JwtErrorMessage.INVALID:
        return response;
      case JwtErrorMessage.EXPIRED:
        if (!account?.active) {
          await db.account.delete({
            where: { token: confirmationCode },
          });
          return { ...response, message: "403001" };
        }
    }
  }
  return { ...response, message: "404001" };
};

const findAccountByToken = async (token: RegisterDataType["token"]) => {
  const account = await db.account.findUnique({
    where: {
      token: token,
    },
    select: { email: true, active: true },
  });
  return account;
};
