"use client";

import emailjs from '@emailjs/browser';

// Replace these with your actual EmailJS credentials
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(PUBLIC_KEY);

interface EmailParams {
  to_email: string;
  subject: string;
  message: string;
}

export const sendEmail = async ({ to_email, subject, message }: EmailParams) => {
  if (!PUBLIC_KEY || PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
    console.warn("EmailJS is not configured. Please add your credentials.");
    return { success: false, error: "EmailJS not configured" };
  }

  try {
    const templateParams = {
      to_email,
      subject,
      message,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
};