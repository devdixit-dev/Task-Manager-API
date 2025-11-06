import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: process.env.HOST_URI,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendMail = async (to: string, subject: string, text: string) => {
  if(!to || !subject || !text) {
    throw new Error("Missing required email fields (to, subject, or text)");
  }

  await transport.sendMail({
    sender: process.env.ADMIN_EMAIL,
    to: to,
    subject: subject,
    text: text
  });
}

export default sendMail;