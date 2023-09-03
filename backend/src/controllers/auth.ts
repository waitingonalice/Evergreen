import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";

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

interface User {
  id: string;
  country: string;
  firstName: string;
  lastName: string;
  active: boolean;
  email: string;
}

export const generateAuthToken = (user: User, secret: string) => {
  const { id: userId, country, firstName, lastName, active, email } = user;
  const auth = jwt.sign(
    {
      data: {
        userId,
        country,
        firstName,
        lastName,
        verified: active,
        email,
      },
    },
    secret,
    { expiresIn: "15min" }
  );
  return auth;
};

export const generateRefreshToken = (
  user: User,
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
