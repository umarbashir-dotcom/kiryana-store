import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client,
});

const sendEmail = async ({ to, subject, html }) => {
    try {
        const message = [
            `From: ${process.env.EMAIL_USER}`,
            `To: ${to}`,
            `Subject: ${subject}`,
            "MIME-Version: 1.0",
            "Content-Type: text/html; charset=UTF-8",
            "",
            html,
        ].join("\r\n");

        const rawMessage = Buffer
            .from(message)
            .toString("base64url");

        const response = await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: rawMessage,
            },
        });

        console.log("Email sent successfully:", response.data.id);

        return response.data;
    } catch (error) {
        console.error(
            "Gmail API email error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export default sendEmail;