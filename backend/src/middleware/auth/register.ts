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
        <a href=http://localhost:3000/verify?email=${registeredData.email}&code=${registeredData.token}> Click here</a>
        </div>`,
    },
    function (error, info) {
      if (error) throw error;
      console.log("Email Sent Successfully");
      console.log(info);
    }
  );
};

export const verify = async (
  email: RegisterDataType["email"],
  confirmationCode: RegisterDataType["token"]
) => {
  const response = { verified: false, message: "401001" };
  try {
    const secretKey = process.env.SESSION_SECRET;
    const decoded = secretKey && jwt.verify(confirmationCode, secretKey);
    const userTokenData = decoded && Object.values(decoded);
    if (userTokenData?.includes(email)) {
      await db.account.update({
        where: { email },
        data: { active: true },
      });
      return {
        ...response,
        verified: true,
        message: "Verification success!",
      };
    }
  } catch (err) {
    const error = err as jwt.VerifyErrors;
    switch (error.message) {
      case JwtErrorMessage.INVALID:
        return response;
      case JwtErrorMessage.EXPIRED:
        await db.account.delete({
          where: { token: confirmationCode },
        });
        return { ...response, message: "403001" };
    }
  }
  return { ...response, message: "404001" };
};
