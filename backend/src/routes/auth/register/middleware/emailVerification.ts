import nodeMailer from "nodemailer";
import { register } from "./registerHash";

type RegisterDataType = Awaited<ReturnType<typeof register>>;

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
      to: registeredData.account.email,
      subject: "Email verification",
      html: `<h1>Email Confirmation for Expense Tracker</h1>
        <h2>Hello ${registeredData.account.firstName}</h2>
        <p>Thank you for registering. Please confirm your email by clicking on the following link below.</p>
        <a href=${process.env.DOMAIN_URL}/verify?code=${registeredData.token}> Click here</a>
        </div>`,
    },
    (error, info) => {
      if (error) throw error;
      console.log("Email Sent Successfully");
      console.log(info);
    }
  );
};
