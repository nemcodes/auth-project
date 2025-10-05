import dotenv from "dotenv";

dotenv.config();

// Create Nodemailer transporter for Sendinblue
export const brevoConfig ={
  host: "smtp-relay.brevo.com", // Sendinblue SMTP server
  port: 587, // 587 for TLS
  secure: false, // use true if you switch to port 465
  auth: {
    user: process.env.SENDINBLUE_USER, // your Sendinblue email/login
    pass: process.env.SENDINBLUE_API_KEY, // your Sendinblue SMTP API key
  },
};

// Default sender info
export const sender = {
  name: "Nemcodes",
  email: process.env.SENDINBLUE_EMAIL,
};
export const SENDINBLUE_API_KEY = process.env.SENDINBLUE_API_KEY; // Required for authentication
export const SENDINBLUE_EMAIL = process.env.SENDINBLUE_EMAIL; // Your Sendinblue email/login
export const SENDINBLUE_ENDPOINT = process.env.SENDINBLUE_ENDPOINT;

export const RECIPIENT_EMAIL = process.env.SENDINBLUE_RECIPIENT_EMAIL; // Where to send test emails