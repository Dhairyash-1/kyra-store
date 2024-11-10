import Mailgen, { Content } from "mailgen";
import nodemailer from "nodemailer";

interface nodemailerOptions {
  email: string;
  subject: string;
  mailgenContent: Content;
}

export const sendEmail = async (options: nodemailerOptions) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "KyraStore",
      link: "dhairyashgupta.com",
    },
  });

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: Number(process.env.MAILTRAP_SMTP_PORT),
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail@kyrastore.com",
    to: options.email,
    subject: options.subject,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.log("error in sending email", error);
  }
};

export const forgotPasswordMailgenContent = (username: string, OTP: string) => {
  return {
    body: {
      name: username,
      intro: "We received a request to reset the password for your account.",
      action: {
        instructions: `To reset your password, please use the following OTP: ${OTP}. This OTP is valid for 15 minutes.`,
        button: {
          color: "#22BC66",
          text: "Reset Password",
          link: "",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
