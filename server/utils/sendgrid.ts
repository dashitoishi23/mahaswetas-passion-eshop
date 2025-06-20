import sgMail from "@sendgrid/mail";
import config from "../config";

sgMail.setApiKey(config.SENDGRID_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
    try {
    const msg = {
        to,
        from: "hitoishi.das@gmail.com",
        subject,
        html,
        };
    
        await sgMail.send(msg);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
}