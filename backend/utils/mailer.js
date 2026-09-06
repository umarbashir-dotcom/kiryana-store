// utils/mailer.js
import nodemailer from "nodemailer" ;

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('PASSWORD LENGTH:', process.env.EMAIL_APP_PASSWORD?.length);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },

    tls: {
        servername: "smtp.gmail.com",
    },

    family: 4,
});

// Verify connection once at startup so you catch bad credentials early,
// instead of finding out only when a user is waiting for their OTP.
transporter.verify((err) => {
  if (err) console.error('Mailer config error:', err.message);
  else console.log('Mailer ready');
});

async function sendOtpEmail(toEmail, otp) {
  await transporter.sendMail({
    from: `"Apna Kiryana App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your verification code',
    html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: auto;">
        <h2 style="color:#1F6F4A;">Verify your login</h2>
        <p>Your one-time code is:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
        <p style="color:#6B7280; font-size: 13px;">This code expires in 5 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
}

export default sendOtpEmail;