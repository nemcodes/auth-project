import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { brevoConfig, sender } from "./mailtrap.config.js";

import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
} from "./emailTemplates.js";

dotenv.config();

// Setup Nodemailer transporter for Sendinblue (Brevo)
const transporter = nodemailer.createTransport(brevoConfig);


// Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });
    console.log("Verification email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

// Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const info = await transporter.sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to Nemcodes 🚀",
      html: `<h1>Welcome, ${name}!</h1><p>Thanks for joining <b>Nemcodes company</b>.</p>`,
    });
    console.log("Welcome email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }
};

// Password Reset Email
export const sendResetEmail = async (email, resetUrl) => {
  try {
    const info = await transporter.sendMail({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
    });
    console.log("Password reset email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};
