import nodemailer from "nodemailer";
import * as config from "./config.js";
import dotenv from "dotenv";
dotenv.config();

// Configuration for nodemailer transporter
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.EMAIL,
    pass: config.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify transporter
transporter.verify().then(() => {
  console.log("Ready for send emails");
});
