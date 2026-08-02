import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const { data, error } = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to Chatify!",
      html: createWelcomeEmailTemplate(name, clientURL),
    });

    if (error) {
      console.warn("Welcome email not delivered via Resend:", error.message || error);
      return;
    }

    console.log("Welcome Email sent successfully", data);
  } catch (err) {
    console.warn("Failed to send welcome email:", err.message || err);
  }
};