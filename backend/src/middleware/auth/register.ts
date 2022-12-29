import { db } from "~/utils";
import { RegisterProps } from "~/types/register";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";

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
  registeredData: Awaited<ReturnType<typeof register>>
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
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${registeredData.firstName}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/verify/${registeredData.token}> Click here</a>
        </div>`,
    },
    function (error, info) {
      if (error) throw error;
      console.log("Email Sent Successfully");
      console.log(info);
    }
  );
};
