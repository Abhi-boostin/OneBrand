import nodemailer from "nodemailer";
import config from "../config/env.js";

export function createTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: config.smtpUser, pass: config.smtpPass }
  });
}

export async function sendOtpEmail(to, otp) {
  const transporter = createTransport();
  const info = await transporter.sendMail({
    from: `OneBrand Account Center <${config.smtpUser}>`,
    to,
    subject: "Your OneBrand OTP Code",
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
    html: `<p>Your verification code is <b>${otp}</b>. It expires in 10 minutes.</p>`
  });
  return info.messageId;
} 