import nodeMailer from "nodemailer";

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
